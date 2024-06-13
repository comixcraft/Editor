<script setup>
    import ComicPanels from '~/components/ComicPanels.vue';
    import iconConfig from '../config/iconsConfig';

    let layersShow = ref(false);
    let previewShow = ref(false);
    let catalogShow = ref(false);
    let goingBackPopUpShow = ref(false);
    let saveDraftPopUpShow = ref(false);
    let lockAspectRatio = ref(false);
    let editor = ref(null);
    let refreshCount = ref(0);
    let intersectionObserver;
    let popUpText = ref('');
    let comicName = ref('');
    let mobileMenu = ref(false);
    const router = useRouter();

    let selectedCategory = ref({});

    const undoEmpty = computed(() => {
        return comicStore.comic.getPage(0).getStrip(0).panels[activePanelIndex.value].cantUndo;
    });

    const redoEmpty = computed(() => {
        return comicStore.comic.getPage(0).getStrip(0).panels[activePanelIndex.value].cantRedo;
    });

    const userDidSomething = computed(() => {
        return comicStore.userDidSomething;
    });

    definePageMeta({
        middleware: ['comic-defined'],
    });

    const allAssetsCategoryName = 'All Assets';
    const comicStore = useComicStore();
    const catalogElements = ref(null);
    const catalogStructure = ref([]);
    const comic = reactive(toRaw(comicStore.comic));
    const activePanelIndex = ref(0);
    const scrollableNav = ref(null);
    const isScrollableLeft = ref(false);
    const isScrollableRight = ref(true);
    const navReactiveHeight = ref(undefined);
    await useFetch('/api/catalog/structure')
        .then((response) => {
            catalogStructure.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });

    let bottomNavHeight = computed(() => {
        return `${Math.floor(navReactiveHeight.value * 10) / 10}px`;
    });

    function fetchCatalogElements(category = [], subCategory = [], filter = []) {
        if (category === allAssetsCategoryName) category = [];
        catalogElements.value = null;

        useFetch('/api/catalog/', {
            method: 'POST',
            body: {
                category: category,
                subCategory: subCategory,
                filter: filter,
            },
        })
            .then((response) => {
                catalogElements.value = response.data.value;
            })
            .catch((error) => {
                catalogElements.value = [];
                createError(error);
            });
    }

    function updateSelectedCategory(category) {
        selectedCategory.value = category;
        catalogShow.value = true;
    }

    function saveComic() {
        let comicJson = comicStore.comic.toJSON();
        comicStore.saveDraft(comicJson);

        comicStore.setComingBackAfterSaving(true);

        return reloadNuxtApp({
            path: '/',
            ttl: 1000,
        });
    }

    function discardComic() {
        comicStore.setUserDidSomething(false);
        return reloadNuxtApp({
            path: '/',
            ttl: 1000,
        });
    }

    function handleUndo() {
        comicStore.comic.getPage(0).getStrip(0).panels[activePanelIndex.value].undo();
        refreshCount.value++;
    }

    function handleRedo() {
        comicStore.comic.getPage(0).getStrip(0).panels[activePanelIndex.value].redoAction();
        refreshCount.value++;
    }

    function handleGoingBack() {
        if (userDidSomething.value) {
            goingBackPopUpShow.value = true;
            if (comicStore.getDraft().value !== null) {
                popUpText.value =
                    'Do you want to save your progress as a draft? <br /> <strong>You can only have one draft at a time.</strong><br /> Saving a new one overwrites the existing one.';
            } else {
                popUpText.value = 'Do you want to save your current comic as a draft?';
            }
        } else {
            comicStore.setUserDidSomething(false);
            return reloadNuxtApp({
                path: '/',
                ttl: 1000,
            });
        }
    }

    function handleSaveDraftBtn() {
        if (userDidSomething.value && comicStore.getDraft().value !== null) {
            saveDraftPopUpShow.value = true;
            if (comicStore.getDraft().value !== null) {
                popUpText.value =
                    'Do you want to save your progress as a draft? <br /> <strong>You can only have one draft at a time.</strong><br /> Saving a new one overwrites the existing one.';
            } else {
                popUpText.value = 'Do you want to save your current comic as a draft?';
            }
        } else if (userDidSomething.value) {
            saveComic();
        }
    }

    window.onbeforeunload = function (e) {
        if (userDidSomething.value && e.target.activeElement === this.document.body) {
            e.preventDefault();
        }
    };

    window.onkeydown = function (e) {
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
            lockAspectRatio.value = true;
        }
    };
    window.onkeyup = function (e) {
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
            lockAspectRatio.value = false;
        }
    };
    window.onresize = function (e) {
        navReactiveHeight.value = scrollableNav.value.getBoundingClientRect().height;
    };

    watch(
        () => comic.getPage(0).getStrip(0).getPanel(0).elements,
        () => comicStore.setUserDidSomething(true),
        { deep: true }
    );

    function detectScrollingPosition(entries) {
        entries.forEach((entry) => {
            entry.isIntersecting
                ? changeScrollingBooleans(entry.target, false)
                : changeScrollingBooleans(entry.target, true);
        });
    }

    function changeScrollingBooleans(element, bool) {
        element === scrollableNav.value.firstChild.firstChild
            ? (isScrollableLeft.value = bool)
            : (isScrollableRight.value = bool);
    }

    onMounted(() => {
        intersectionObserver = new IntersectionObserver(detectScrollingPosition, {
            threshold: 0.9,
            root: scrollableNav.value,
        });

        intersectionObserver.observe(scrollableNav.value.firstChild.firstChild);
        intersectionObserver.observe(scrollableNav.value.firstChild.lastChild);

        document.fonts.ready.then(() => {
            navReactiveHeight.value = scrollableNav.value.getBoundingClientRect().height;
        });
    });

    onBeforeUnmount(() => {
        window.onkeydown = null;
        window.onkeyup = null;
        window.onbeforeunload = null;
        window.onresize = null;
        intersectionObserver.disconnect();
    });
</script>

<template>
    <div class="editor" ref="editor">
        <div class="editor__top-nav top-nav">
            <div class="top-nav__left-btns">
                <button class="share__top-nav-item back-btn icon icon-btn" @click="handleGoingBack">arrow_back</button>
                <div class="undo-redo-container">
                    <button class="top-nav__item-undo-btn icon icon-btn" @click="handleUndo" :disabled="undoEmpty">
                        Undo
                    </button>
                    <button class="top-nav__item-redo-btn icon icon-btn" @click="handleRedo" :disabled="redoEmpty">
                        Redo
                    </button>
                </div>
                <input
                    type="text"
                    class="top-nav__name-input input d-none d-lg-block"
                    ref="comicName"
                    v-model="comic.name"
                />
            </div>

            <div class="top-nav__left-btns">
                <!-- layer -->
                <div class="top-nav__item layer-btn">
                    <button @click="layersShow = true" class="secondary-btn">
                        <div class="icon">stacks</div>
                        <span class="d-none d-xl-block">Layers</span>
                    </button>
                </div>
                <!-- preview btn -->
                <div class="top-nav__item preview-btn">
                    <button @click="previewShow = true" class="secondary-btn">
                        <div class="icon">preview</div>
                        <span class="d-none d-xl-block"> Preview </span>
                    </button>
                </div>
                <!-- save draft btn -->
                <div class="top-nav__item saveDraft-btn d-none d-lg-block">
                    <button class="secondary-btn" @click="handleSaveDraftBtn">
                        <div class="icon">save</div>
                        <span class="d-none d-xl-block"> Save </span>
                    </button>
                </div>
                <!-- download btn -->
                <div class="top-nav__item export-btn d-none d-lg-block">
                    <button class="secondary-btn">
                        <NuxtLink
                            :to="{
                                name: 'export',
                                path: '/export',
                            }"
                        >
                            <div class="icon">download</div>
                            <span class="d-none d-xl-block"> Download</span>
                        </NuxtLink>
                    </button>
                </div>
                <div class="top-nav__item export-btn d-lg-none">
                    <button class="secondary-btn icon" @click="mobileMenu = true">more_horiz</button>
                </div>
            </div>
        </div>

        <!-- Editor -->
        <div class="d-flex flex-column flex-lg-row flex-grow-1">
            <div class="editor__canvas col-12 col-lg-8">
                <ComicPanels
                    :lockAspectRatio="lockAspectRatio"
                    :comic="comic"
                    :refreshCount="refreshCount"
                    @active-panel-change="activePanelIndex = $event"
                ></ComicPanels>
            </div>
            <div
                class="bottom-nav__scrollable-nav col-12 col-lg-2 col-xl-1 order-lg-first"
                :class="{
                    'bottom-nav__scrollable-nav-before': isScrollableLeft,
                    'bottom-nav__scrollable-nav-after': isScrollableRight,
                }"
                ref="scrollableNav"
            >
                <CatalogNavigation
                    :categories="catalogStructure.categories"
                    @categorySelected="updateSelectedCategory"
                />
            </div>
            <div class="catalog-container col-lg-2 col-xl-3 order-lg-first">
                <CatalogLayout
                    :title="selectedCategory.name"
                    :selectedCategoryAssets="catalogElements"
                    :selectedCategory="selectedCategory"
                    @catalog-changed="(e) => fetchCatalogElements(e.category, e.subCategory, e.filter)"
                />
            </div>
        </div>
    </div>

    <!-- Catalog nav on mobile -->
    <div class="d-lg-none">
        <OverlayModal :full="true" :show="catalogShow" @close="catalogShow = false" :padding="'0'">
            <div class="category__description">
                <div class="edit-icon icon text-primary">
                    {{ iconConfig.get(selectedCategory.name) || 'default_icon' }}
                </div>
                <div class="navigation__title h1">{{ selectedCategory.name }}</div>
            </div>
            <div class="catalog-overlay-content">
                <CatalogLayout
                    :selectedCategoryAssets="catalogElements"
                    :selectedCategory="selectedCategory"
                    @catalog-changed="(e) => fetchCatalogElements(e.category, e.subCategory, e.filter)"
                    @element-added="catalogShow = false"
                />
            </div>
        </OverlayModal>
    </div>

    <!-- Going back popup -->
    <OverlayModal :show="goingBackPopUpShow" :full="false" @close="goingBackPopUpShow = false">
        <DecisionPopUp
            imgSrc="/Barista Exclaiming4.png"
            title="Poof, your hard work disappears..."
            :buttons="[
                { name: 'Save Draft', emitName: 'save' },
                { name: 'Discard All Changes', emitName: 'discard' },
                { name: 'Return to Editing', emitName: 'cancel' },
            ]"
            @cancel="goingBackPopUpShow = false"
            @save="saveComic"
            @discard="discardComic"
        >
            <div v-html="popUpText"></div>
        </DecisionPopUp>
    </OverlayModal>

    <!-- saveDraft Popup -->
    <OverlayModal :show="saveDraftPopUpShow" :full="false" @close="saveDraftPopUpShow = false">
        <DecisionPopUp
            imgSrc="/Barista Exclaiming4.png"
            title="You can only have one draft."
            :buttons="[
                { name: 'Save Draft', emitName: 'save' },
                { name: 'Cancel', emitName: 'cancel' },
            ]"
            @cancel="saveDraftPopUpShow = false"
            @save="saveComic"
        >
            <div v-html="popUpText"></div>
        </DecisionPopUp>
    </OverlayModal>

    <!-- mobile submenu popup -->
    <OverlayModal :show="mobileMenu" :full="false" @close="mobileMenu = false">
        <DecisionPopUp
            :buttons="[
                { name: 'Export', emitName: 'download' },
                { name: 'Save Draft', emitName: 'save' },
            ]"
            @save="saveComic"
            @download="router.push({ name: 'export', path: '/export' })"
        >
            <div class="project-name">
                <label for="project-name">Project Name</label>
                <input type="text" id="project-name" class="input" v-model="comic.name" />
            </div>
        </DecisionPopUp>
        <p class="alertDraftTxt">Saving a draft will override any currently saved draft</p>
    </OverlayModal>

    <!-- Layers overlay -->
    <ScreenOverlay title="Layers" :show="layersShow" @close="layersShow = false">
        <div class="layer-background">
            <div class="layer-container">
                <LayerObject :panel="comic.getPage(0).getStrip(0).getPanel(activePanelIndex)"> </LayerObject>
            </div>
        </div>
    </ScreenOverlay>

    <!-- Preview overlay -->
    <ScreenOverlay
        title="Preview"
        :show="previewShow"
        @close="previewShow = false"
        class="preview__overlay"
        @click="previewShow = false"
    >
        <div class="darken-background">
            <PreviewCanvas @click.stop="true" />
        </div>
    </ScreenOverlay>
</template>

<style scoped lang="scss">
    :fullscreen,
    ::backdrop {
        background-color: $white;
    }

    .preview__overlay {
        overflow-y: hidden !important;
    }
    .editor:before {
        content: 's';
        display: none;
        visibility: hidden;

        @include media-breakpoint-up(lg) {
            content: 'lg';
        }
    }

    .editor {
        display: flex;
        flex-direction: column;
        height: 100svh;

        &__top-nav {
            justify-content: space-between;
            user-select: none;
        }
    }

    .secondary-btn {
        border: none;
        background-color: transparent;
        color: $white;
        column-gap: $spacer-1;
        text-align: center;
        vertical-align: middle;

        a {
            text-decoration: none;
            color: $white;
            display: flex;
            column-gap: $spacer-1;
        }

        @include media-breakpoint-up(lg) {
            display: flex;
            column-gap: $spacer-1;
            width: 100%;
            height: 100%;
            padding: $spacer-3 $spacer-3;
            &:hover {
                scale: 1.1;
            }
        }
    }

    .layer-background {
        padding-top: $spacer-5;
        height: calc(100dvh - $nav-bar-height);
        background-color: $white;
    }

    .layer-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: $white;
    }

    .undo-redo-container {
        display: flex;
        column-gap: $spacer-1;
        color: $white;

        @include media-breakpoint-up(lg) {
            column-gap: $spacer-4;
        }
    }

    .editor__canvas {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
    }

    .bottom-nav__scrollable-nav {
        display: flex;
        background-color: $grey-90;
        padding: $spacer-3;
        overflow-x: auto;
        scroll-behavior: smooth;
        position: relative;

        @include media-breakpoint-up(sm) {
            justify-content: center;
        }

        @include media-breakpoint-up(lg) {
            flex-direction: column;
            justify-content: start;
            gap: $spacer-2;
            overflow-x: visible;
            flex-grow: 0;
        }
    }

    .bottom-nav__scrollable-nav-before::before {
        content: '';
        position: fixed;
        bottom: 0;
        left: 0;
        height: v-bind(bottomNavHeight);
        width: 150px;
        box-shadow: inset 95px 0px 35px -35px rgba(27, 27, 27, 0.8);
        pointer-events: none;
        display: table-cell;
    }
    .bottom-nav__scrollable-nav-after::after {
        content: '';
        position: fixed;
        bottom: 0;
        right: 0;
        height: v-bind(bottomNavHeight);
        width: 150px;
        box-shadow: inset -95px 0px 35px -35px rgba(27, 27, 27, 0.8);
        pointer-events: none;
        display: table-cell;
    }

    .darken-background {
        display: flex;
        flex-direction: column;
        padding-top: $spacer-5;
        align-items: center;
        justify-content: flex-start;
        height: 100%;

        @include media-breakpoint-up(lg) {
            padding-top: 0;
            justify-content: center;
        }
    }

    .bottom-nav__container {
        white-space: nowrap;
        display: flex;

        @include media-breakpoint-up(lg) {
            white-space: wrap;
        }
    }

    .share__top-nav-item {
        color: $white;
        text-decoration: none;
        &:hover {
            scale: 1.1;
        }
    }

    .alertDraftTxt {
        font-style: italic;
        align-items: center;
        text-align: center;
        padding-top: $spacer-5;
    }

    .catalog-container {
        display: none;

        @include media-breakpoint-up(lg) {
            display: flex;
            background-color: $white;
            height: calc(100dvh - $nav-bar-height);
            box-shadow: $box-shadow-right;
        }
    }

    .category__description {
        margin-left: $spacer-2;
        padding-left: $spacer-3;
        margin-top: -$spacer-1;
        color: $primary;
        display: flex;
        gap: $spacer-2;
        position: absolute;
        width: 100%;
        background-color: $white;
        z-index: 2;
        align-items: center;
    }
    .catalog-overlay-content {
        height: 87svh;
        overflow-y: auto;
    }

    .top-nav {
        &__item-undo-btn,
        &__item-redo-btn {
            color: $grey-0;
            @include media-breakpoint-up(lg) {
                &:hover {
                    scale: 1.2;
                }
                &:disabled {
                    scale: 1; // Prevent scaling on hover when disabled
                    cursor: not-allowed; // Change cursor to indicate disabled state
                    &:hover {
                        scale: 1;
                    }
                }
            }
        }
        &__left-btns {
            display: flex;
            column-gap: $spacer-3;
            align-items: center;

            @include media-breakpoint-up(lg) {
                column-gap: $spacer-5;
            }
        }
        &__name-input {
            border: 1px solid $white;
            background-color: transparent;
            color: $white;
            padding: $spacer-2;
        }
    }

    @include media-breakpoint-up(md) {
        .edit-icon {
            font-size: 40px;
        }
    }

    .project-name {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid $grey-60;
        padding-bottom: $spacer-3;
        align-items: baseline;
        width: 100%;
        gap: $spacer-2;

        .input {
            width: 100%;
        }
    }
</style>

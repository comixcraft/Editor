<script setup>
    import ComicPanels from '~/components/ComicPanels.vue';
    import iconConfig from '../config/iconsConfig';

    let layersShow = ref(false);
    let previewShow = ref(false);
    let catalogShow = ref(false);
    let goingBackPopUpShow = ref(false);
    let lockAspectRatio = ref(false);
    let editor = ref(null);
    let userDidSomething = ref(false);
    let refreshCount = ref(0);

    let selectedCategory = ref({});

    const undoEmpty = computed(() => {
        return comicStore.comic.getPage(0).getStrip(0).panels[activePanelIndex.value].cantUndo;
    });

    const redoEmpty = computed(() => {
        return comicStore.comic.getPage(0).getStrip(0).panels[activePanelIndex.value].cantRedo;
    });

    definePageMeta({
        middleware: ['comic-defined'],
    });

    const allAssetsCategoryName = 'All Assets';
    const comicStore = useComicStore();
    const catalogElements = ref([]);
    const catalogStructure = ref([]);
    const comic = reactive(toRaw(comicStore.comic));
    const activePanelIndex = ref(0);
    const catalogLayoutRef = ref(null);

    await useFetch('/api/catalog/structure')
        .then((response) => {
            catalogStructure.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });

    function fetchCatalogElements(category = [], subCategory = [], filter = []) {
        if (category === allAssetsCategoryName) category = [];

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

        return reloadNuxtApp({
            path: '/',
            ttl: 1000,
        });
    }

    function discardComic() {
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
        } else {
            return reloadNuxtApp({
                path: '/',
                ttl: 1000,
            });
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

    watch(
        () => comic.getPage(0).getStrip(0).getPanel(0).elements,
        () => (userDidSomething.value = true),
        { deep: true }
    );

    onBeforeUnmount(() => {
        window.onkeydown = null;
        window.onkeyup = null;
        window.onbeforeunload = null;
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
            </div>

            <div class="top-nav__left-btns">
                <div class="top-nav__item layer-btn">
                    <button @click="layersShow = true" class="secondary-btn">
                        <div class="icon">stacks</div>
                        <span class="d-none d-lg-block">Layers</span>
                    </button>
                </div>
                <div class="top-nav__item preview-btn">
                    <button @click="previewShow = true" class="secondary-btn">
                        <div class="icon">preview</div>
                        <span class="d-none d-lg-block"> Preview </span>
                    </button>
                </div>
                <div class="top-nav__item export-btn">
                    <button class="secondary-btn">
                        <NuxtLink
                            :to="{
                                name: 'export',
                                path: '/export',
                            }"
                        >
                            <div class="icon">download</div>
                            <span class="d-none d-lg-block"> Download</span>
                        </NuxtLink>
                    </button>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column flex-lg-row flex-grow-1">
            <div class="editor__canvas col-12 col-lg-8">
                <ComicPanels
                    :lockAspectRatio="lockAspectRatio"
                    :comic="comic"
                    :refreshCount="refreshCount"
                    @active-panel-change="activePanelIndex = $event"
                ></ComicPanels>
            </div>
            <div class="bottom-nav__scrollable-nav col-12 col-lg-2 col-xl-1 order-lg-first">
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
    <OverlayModal :show="goingBackPopUpShow" :full="false" @close="goingBackPopUpShow = false">
        <DecisionPopUp
            imgSrc="http://localhost:3000/catalog/Characters/single/Barista%20pouring4.png?raw=true"
            title="Poof, Your hard work disappears"
            body="Are you sure you want to delete your draft? All the changes you've made will be discarded."
            :buttons="[
                { name: 'Save Draft', emitName: 'save' },
                { name: 'Discard all changes', emitName: 'discard' },
                { name: 'Cancel', emitName: 'cancel' },
            ]"
            @cancel="goingBackPopUpShow = false"
            @save="saveComic"
            @discard="discardComic"
        />
    </OverlayModal>
    <ScreenOverlay title="Layers" :show="layersShow" @close="layersShow = false">
        <div class="layer-background">
            <div class="layer-container">
                <LayerObject :panel="comic.getPage(0).getStrip(0).getPanel(activePanelIndex)"> </LayerObject>
            </div>
        </div>
    </ScreenOverlay>
    <ScreenOverlay title="Preview" :show="previewShow" @close="previewShow = false" class="preview__overlay">
        <div class="darken-background">
            <PreviewCanvas />
        </div>
    </ScreenOverlay>
</template>

<style scoped lang="scss">
    .preview__overlay {
        overflow-y: hidden !important;
    }
    .editor:before {
        content: 's';
        display: none;
        visibility: hidden;
    }

    .editor {
        display: flex;
        flex-direction: column;
        height: 100dvh;

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
            padding: $spacer-3 $spacer-5;
            &:hover {
                scale: 1.1;
            }
        }
    }

    .layer-background {
        padding-top: $spacer-5;
        width: 100vw;
        height: 100vh;
        background-color: $white;
    }

    .layer-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: $white;
    }

    .top-nav__left-btns {
        display: flex;
        column-gap: $spacer-3;

        @include media-breakpoint-up(lg) {
            column-gap: $spacer-6;
        }
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

        @include media-breakpoint-up(lg) {
            flex-direction: column;
            gap: $spacer-2;
            overflow-x: visible;
            flex-grow: 0;
        }
    }

    .darken-background {
        width: 100vw;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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

    .catalog-container {
        display: none;

        @include media-breakpoint-up(lg) {
            display: flex;
            background-color: $white;
            height: calc(100dvh - 3.5rem);
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
    }
    .catalog-overlay-content {
        height: 87svh;
        overflow-y: auto;
    }

    .top-nav__item-undo-btn {
        color: $grey-0;
    }
    .top-nav__item-redo-btn {
        color: $grey-0;
    }
</style>

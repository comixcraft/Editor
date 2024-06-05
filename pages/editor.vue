<script setup>
    import ComicPanels from '~/components/ComicPanels.vue';
    import iconConfig from '../config/iconsConfig';

    let layersShow = ref(false);
    let previewShow = ref(false);
    let catalogShow = ref(false);
    let goingBackPopUpShow = ref(false);
    let lockAspectRatio = ref(false);
    let editor = ref(null);
    let editorSize = ref(null);
    let userDidSomething = ref(false);
    let refreshCount = ref(0);
    let intersectionObserver;

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
    window.onresize = function (e) {
        navReactiveHeight.value = scrollableNav.value.getBoundingClientRect().height;
    };

    watch(
        () => comic.getPage(0).getStrip(0).getPanel(0).elements,
        () => (userDidSomething.value = true),
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

    // window.mobileCheck = function() {
    //     let check = false;
    //     (function(a){
    //         if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
    //             .test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
    //         check = true;
    //     })
    //         (navigator.userAgent||navigator.vendor||window.opera);
    //     return check;
    // };

    onMounted(() => {
        window.scrollTo(0, 1);
        editorSize.value = window.getComputedStyle(editor.value, ':before').getPropertyValue('content').slice(1, -1);
        if (editorSize.value === 's') {
            console.log('force fullscreen');
            editor.value.requestFullscreen();
        }

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
            imgSrc="/Barista_pouring4.png"
            title="Poof, your hard work disappears..."
            body="Are you sure you want to delete your draft? All the changes you've made will be discarded."
            :buttons="[
                { name: 'Save Draft', emitName: 'save' },
                { name: 'Discard All Changes', emitName: 'discard' },
                { name: 'Return to Editing', emitName: 'cancel' },
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
        background-color: rgb(255, 255, 255);
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

    .top-nav__item-undo-btn {
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

    .top-nav__item-redo-btn {
        color: $grey-0;
        @include media-breakpoint-up(lg) {
            &:hover {
                scale: 1.2;
            }
            &:disabled {
                scale: 1;
                cursor: not-allowed;
                &:hover {
                    scale: 1;
                }
            }
        }
    }

    @include media-breakpoint-up(md) {
        .edit-icon {
            font-size: 40px;
        }
    }
</style>

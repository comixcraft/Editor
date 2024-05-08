<script setup>
    import ComicPanels from '~/components/ComicPanels.vue';
    import iconConfig from '../config/iconsConfig';
    import Comic from '~/utils/Classes/Comic';

    let layersShow = ref(false);
    let previewShow = ref(false);
    let catalogShow = ref(false);
    let goingBackPopUpShow = ref(false);
    let selectedElementId = ref(null);
    let lockAspectRatio = ref(false);

    let selectedCategory = ref({});

    definePageMeta({
        middleware: ['comic-defined'],
    });

    const allAssetsCategoryName = 'All Assets';
    const comicStore = useComicStore();
    const catalogElements = ref([]);
    const catalogStructure = ref([]);
    const comic = reactive(toRaw(comicStore.comic));
    const activePanelIndex = ref(0);

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
        fetchCatalogElements(category.name, [], []);
    }

    function handleSelectAllAssets() {
        selectedCategory.value = {
            name: allAssetsCategoryName,
            subCategories: [],
        };
        catalogShow.value = true;
        fetchCatalogElements([], [], []);
    }

    function selectElement(eId) {
        selectedElementId.value = eId;
    }

    function saveComic() {
        let comicJson = comicStore.comic.toJSON();

        comicStore.saveDraft(comicJson);
        return navigateTo('/');
    }

    function discardComic() {
        comicStore.comic = new Comic(null, null, null);
        return navigateTo('/');
    }

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

    onMounted(() => {
        fetchCatalogElements();
    });
</script>

<template>
    <div class="editor">
        <div class="editor__top-nav">
            <div class="editor__top-nav__left-btns">
                <button class="top-nav__item back-btn icon icon-btn" @click="goingBackPopUpShow = true">
                    <!-- <NuxtLink :to="{ name: 'index', path: '/index' }" class="share__top-nav-item back-btn icon">
                        arrow_back
                    </NuxtLink> -->
                    arrow_back
                </button>
                <div class="undo-redo-container d-none">
                    <button class="top-nav__item undo-btn icon icon-btn">Undo</button>
                    <button class="top-nav__item redo-btn icon icon-btn">Redo</button>
                </div>
            </div>

            <div class="editor__top-nav__left-btns">
                <div class="top-nav__item layer-btn">
                    <button @click="layersShow = true" class="secondary-btn">
                        <div class="icon">stacks</div>
                        <span class="display-none">Layers</span>
                    </button>
                </div>
                <div class="top-nav__item preview-btn d-none">
                    <button @click="previewShow = true" class="secondary-btn">
                        <div class="icon">preview</div>
                        <span class="display-none"> Preview </span>
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
                            <span class="display-none"> Download</span>
                        </NuxtLink>
                    </button>
                </div>
            </div>
        </div>
        <div class="editor__canvas">
            <ComicPanels
                :lockAspectRatio="lockAspectRatio"
                :comic="comic"
                @active-panel-change="activePanelIndex = $event"
            ></ComicPanels>
        </div>

        <div class="bottom-nav__container">
            <div class="editor__bottom-nav">
                <div class="bottom-nav__scrollable-nav">
                    <CatalogNavigation
                        :categories="catalogStructure.categories"
                        @categorySelected="updateSelectedCategory"
                        @selectAllAssets="handleSelectAllAssets"
                    />
                </div>
            </div>
            <div class="catalogue-container">
                <CatalogLayout
                    :title="selectedCategory.name"
                    :selectedCategoryAssets="catalogElements"
                    :selectedCategory="selectedCategory"
                    @catalog-changed="(e) => fetchCatalogElements(e.category, e.subCategory, e.filter)"
                />
            </div>
        </div>
        <div class="modal-container">
            <OverlayModal :full="true" :show="catalogShow" @close="catalogShow = false">
                <div class="category__description">
                    <div class="edit-icon icon text-primary">
                        {{ iconConfig.get(selectedCategory.name) || 'default_icon' }}
                    </div>
                    <div class="navigation__title h1">{{ selectedCategory.name }}</div>
                </div>
                <CatalogLayout
                    :selectedCategoryAssets="catalogElements"
                    :selectedCategory="selectedCategory"
                    @catalog-changed="(e) => fetchCatalogElements(e.category, e.subCategory, e.filter)"
                />
            </OverlayModal>
            <OverlayModal :show="goingBackPopUpShow" :full="false" @close="goingBackPopUpShow = false">
                <DecisionPopUp
                    imgSrc="http://localhost:3000/catalog/Characters/single/Barista%20pouring4.png?raw=true"
                    title="Poof, Your hard work disappears"
                    body="Are you sure you want to delete your draft? All the changes you've made will be discarded."
                    :buttons="[
                        { name: 'Save Draft', function: 'save' },
                        { name: 'Discard all changes', function: 'discard' },
                        { name: 'Cancel', function: 'cancel' },
                    ]"
                    @cancel="goingBackPopUpShow = false"
                    @save="saveComic"
                    @discard="discardComic"
                />
            </OverlayModal>
        </div>
        <ScreenOverlay title="Layers" :show="layersShow" @close="layersShow = false">
            <div class="layer-background">
                <div class="layer-container">
                    <LayerObject
                        :panel="comic.getPage(0).getStrip(0).getPanel(activePanelIndex)"
                        @selection-event="selectElement"
                    >
                    </LayerObject>
                </div>
            </div>
        </ScreenOverlay>
        <ScreenOverlay title="Preview" :show="previewShow" @close="previewShow = false">
            <div class="darken-background">
                <div class="comic-preview"></div>
            </div>
        </ScreenOverlay>
    </div>
</template>

<style scoped lang="scss">
    .secondary-btn {
        border: none;
        background-color: transparent;
        color: $white;
        column-gap: $spacer-1;
        text-align: center;
        vertical-align: middle;
    }

    .secondary-btn a {
        text-decoration: none;
        color: $white;
        display: flex;
        column-gap: $spacer-1;
    }

    .icon-btn {
        border: none;
        text-align: center;
        border-radius: $border-radius;
        vertical-align: middle;
        background-color: transparent;
        color: $white;
    }

    .display-none {
        display: none;
    }

    .layer {
        height: 100vh;
        width: 100%;
    }
    .layer-background {
        width: 100vw;
        height: 100vh;
        background-color: $white;
    }

    .layer-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .editor__top-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        margin: 0;
        background-color: $primary;
        padding: $spacer-4 $spacer-3;
    }

    .editor__top-nav__left-btns {
        display: flex;
        column-gap: $spacer-3;
    }

    .undo-redo-container {
        display: flex;
        column-gap: $spacer-1;
        color: $white;
    }

    .editor__canvas {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: calc(100vh - 80px);
        width: 70vw;
        margin-left: auto;
    }

    .editor__bottom-nav {
        background-color: $grey-90;
        padding: $spacer-3;
    }

    .bottom-nav__scrollable-nav {
        display: flex;
        overflow-x: auto;
    }

    .scrollable-nav__item {
        padding: $spacer-2 $spacer-3;
        margin-right: $spacer-2;
        color: $grey-70;
        cursor: pointer;
        border-radius: $border-radius;
        background-color: $white;
    }

    .scrollable-nav__item:hover {
        background-color: $grey-60;
    }

    .darken-background {
        width: 100vw;
        height: 100vh;
        background-color: $black;
        opacity: 60%;
    }

    .comic-preview {
        width: 60vw;
        height: 20vh;
        background-color: $grey-70;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .bottom-nav__container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: $white;
        z-index: 1000;
    }

    .share__top-nav-item {
        color: $white;
        text-decoration: none;
    }

    .catalogue-container {
        display: none;
    }

    .category__description {
        margin-left: $spacer-2;
        color: $primary;
        display: flex;
        gap: $spacer-2;
    }

    @include media-breakpoint-up(lg) {
        .secondary-btn {
            display: flex;
            column-gap: $spacer-1;
            width: 100%;
            height: 100%;
            padding: $spacer-3 $spacer-5;
        }

        .editor__top-nav {
            padding: $spacer-2 $spacer-3;
            z-index: 999999;
        }

        .display-none {
            display: block;
        }

        .editor__top-nav__left-btns {
            display: flex;
            column-gap: $spacer-6;
        }

        .undo-redo-container {
            column-gap: $spacer-4;
        }

        .editor__bottom-nav {
            height: calc(100vh - 80px);
        }

        .mobile {
            display: none;
        }
        .editor__canvas {
            align-items: center;
            display: flex;
            justify-content: right;
            padding: $spacer-4;
        }

        .bottom-nav__container {
            position: absolute;
            top: 80px;
            left: 0;
            width: 200px;
            background-color: $white;
            z-index: 1000;
        }

        .bottom-nav__scrollable-nav {
            display: flex;
            flex-direction: column;
            padding: 20px;
            gap: 10px;
        }

        .bottom-nav__scrollable-nav {
            display: flex;
            overflow-y: auto;
        }

        .catalogue-container {
            display: block;
            width: 25vw;
            background-color: $white;
            position: absolute;
            top: 0px;
            left: 200px;
            z-index: 900;
            height: calc(100vh - 80px);
        }
        .modal-container {
            display: none;
        }
    }
</style>

<script setup>
    import ComicPanels from '~/components/ComicPanels.vue';
    import ElementDS from '~/utils/Classes/Element.js';
    import Text from '~/utils/Classes/Text.js';

    let layersShow = ref(false);
    let previewShow = ref(false);
    let catalogShow = ref(false);
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
    const comic = reactive(comicStore.comic);
    const activePanelIndex = ref(0);

    await useFetch('/api/catalog/structure')
        .then((response) => {
            catalogStructure.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });

    function addElementToActivePanel(element) {
        comic.getPage(0).getStrip(0).getPanel(activePanelIndex.value).addElement(element);
    }

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

    function addNewTextToDisplay() {
        let fixedHeight = 200;
        let src = '';
        let width = 200;
        let name = 'Double-click to edit me.';
        let type = new Text(name, 24, 'Pangolin');
        let tempEl = new ElementDS(width, fixedHeight, name, src, type);
        addElementToActivePanel(tempEl);
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
            <div class="top-nav__item back-btn icon">
                <NuxtLink :to="{ name: 'index', path: '/index' }" class="share__top-nav-item back-btn icon">
                    arrow_back
                </NuxtLink>
            </div>
            <div class="top-nav__item undo-btn icon d-none">undo</div>
            <div class="top-nav__item redo-btn icon d-none">redo</div>
            <div class="top-nav__item preview-btn d-none"><button @click="previewShow = true">preview</button></div>
            <div class="top-nav__item layer-btn"><button @click="layersShow = true">layers</button></div>
            <div class="top-nav__item export-btn icon">
                <NuxtLink
                    :to="{
                        name: 'export',
                        path: '/export',
                    }"
                    >export
                </NuxtLink>
            </div>
        </div>
        <div class="editor__canvas">
            <ComicPanels
                :lockAspectRatio="lockAspectRatio"
                :comic="comic"
                :selectedId="selectedElementId"
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
                        @addNewTextToDisplay="addNewTextToDisplay"
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
            <OverlayModal :title="selectedCategory.name" :show="catalogShow" @close="catalogShow = false">
                <CatalogLayout
                    :selectedCategoryAssets="catalogElements"
                    :selectedCategory="selectedCategory"
                    @catalog-changed="(e) => fetchCatalogElements(e.category, e.subCategory, e.filter)"
            /></OverlayModal>
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
    .layer {
        height: 100vh;
        width: 100%;
    }
    .layer-background {
        width: 100vw;
        height: 100vh;
        background-color: white;
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
        height: 80px;
        margin: 0;
        background-color: $primary;
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
        padding: 8px 16px;
        margin-right: 10px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        border-radius: 4px;
        background-color: #fff;
    }

    .scrollable-nav__item:hover {
        background-color: #e0e0e0;
    }

    .darken-background {
        width: 100vw;
        height: 100vh;
        background-color: black;
        opacity: 60%;
    }

    .comic-preview {
        width: 60vw;
        height: 20vh;
        background-color: #ccc;
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
        background-color: #fff;
        z-index: 1000;
    }

    .share__top-nav-item {
        color: #fff;
    }
    .catalogue-container {
        display: none;
    }

    @include media-breakpoint-up(lg) {
        .editor__top-nav {
            z-index: 999999;
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
            background-color: #fff;
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

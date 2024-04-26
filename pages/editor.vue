<template>
    <div class="editor">
        <div class="editor__top-nav">
            <div class="editor__top-nav__left-btns">
                <button class="top-nav__item back-btn icon icon-btn">
                    <NuxtLink :to="{ name: 'index', path: '/index' }" class="share__top-nav-item back-btn icon">
                        arrow_back
                    </NuxtLink>
                </button>
                <div class="undo-redo-container">
                    <button class="top-nav__item undo-btn icon icon-btn">Undo</button>
                    <button class="top-nav__item redo-btn icon icon-btn">Redo</button>
                </div>
            </div>

            <div class="editor__top-nav__left-btns">
                <div class="top-nav__item preview-btn">
                    <button @click="layersShow = true" class="secondary-btn">
                        <div class="icon">stacks</div>
                        <span class="display-none">Layers</span>
                    </button>
                </div>
                <div class="top-nav__item layer-btn">
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
            <ComicPanels :comic="comic" @active-panel-change="activePanelIndex = $event"></ComicPanels>
        </div>

        <div class="bottom-nav__container">
            <div class="editor__bottom-nav">
                <div class="bottom-nav__scrollable-nav">
                    <div class="scrollable-nav__item characters-btn">Characters</div>
                    <div class="scrollable-nav__item speech-bubble-btn">Speech Bubble</div>
                    <div class="scrollable-nav__item text-btn">Text</div>
                    <div class="scrollable-nav__item shapes-btn">Shapes</div>
                    <div class="scrollable-nav__item scenes-btn">Scenes</div>
                </div>
            </div>
            <div class="catalogue-container">
                <CatalogSearch
                    placeholder="happy, barista, ..."
                    :filters="catalogStructure.categories[0].subCategories[0].filter"
                    @search="
                        (selectedFilter) => {
                            fetchCatalogElements(
                                catalogStructure.categories[0].name,
                                catalogStructure.categories[0].subCategories[0].name,
                                selectedFilter
                            );
                        }
                    "
                />
                <CatalogContainer :assets="catalogElements" @add-element="addElementToActivePanel"></CatalogContainer>
            </div>
        </div>
        <ScreenOverlay title="Layers" :show="layersShow" @close="layersShow = false">
            <div class="layer-background">
                <div class="layer-container">
                    <LayerObject></LayerObject>
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

<style scoped lang="scss"></style>

<script setup>
    let layersShow = ref(false);
    let previewShow = ref(false);

    definePageMeta({
        middleware: ['comic-defined'],
    });

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

    onMounted(() => {
        fetchCatalogElements();
    });
</script>

<style scoped lang="scss">
    .secondary-btn {
        border: none;
        background-color: transparent;
        color: white;
        column-gap: $spacer-1;
        height: 40px;
        width: 40px;
        text-align: center;
        vertical-align: middle;
    }

    .secondary-btn a {
        text-decoration: none;
        color: white;
        display: flex;
        column-gap: $spacer-1;
    }

    .icon-btn {
        border: none;
        height: 40px;
        width: 40px;
        text-align: center;
        border-radius: $border-radius;
        vertical-align: middle;
        background-color: transparent;
        color: white;
    }

    .display-none {
        display: none;
    }

    .layer-background {
        width: 100vw;
        height: 100vh;
        background-color: white;
    }

    .layer-container {
        display: flex;
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
        padding: 0 $spacer-3;
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
        height: 100vh;
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
        text-decoration: none;
    }

    .catalogue-container {
        display: none;
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
            padding: 0 $spacer-4;
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
            height: 100vh;
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
            height: 100vh;
            background-color: #ccc;
            position: absolute;
            top: 0px;
            left: 200px;
            z-index: 900;
        }
    }
</style>

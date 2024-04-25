<script setup>
    import ComicPanels from '~/components/ComicPanels.vue';
    import ElementDS from '~/utils/Classes/Element.js';
    import Text from '~/utils/Classes/Text.js';

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

    function addNewTextToDisplay() {
        let fixedHeight = 200;
        let src = '';
        let width = 200;
        let name = 'New text.';
        let type = new Text(name, 24, 'Pangolin');
        let tempEl = new ElementDS(width, fixedHeight, name, src, type);
        addElementToActivePanel(tempEl);
    }

    onMounted(() => {
        fetchCatalogElements();
    });
</script>

<template>
    <div class="editor__container">
        <ComicPanels :comic="comic" @active-panel-change="activePanelIndex = $event"></ComicPanels>
        <div>
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

    <button @click="addNewTextToDisplay">Add a text</button>
    <button>
        <NuxtLink
            :to="{
                name: 'export',
                path: '/export',
            }"
            >See Preview
        </NuxtLink>
    </button>
</template>

<style scoped lang="scss">
    .editor__container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>

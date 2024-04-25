<!-- CatalogEditor -->
<script setup>
    import ComicPanels from '~/components/ComicPanels.vue';
    import { ref } from 'vue';

    definePageMeta({
        middleware: ['comic-defined'],
    });

    const comicStore = useComicStore();
    const catalogElements = ref([]);
    const catalogStructure = ref([]);
    const comic = reactive(comicStore.comic);
    const activePanelIndex = ref(0);

    let catalogShow = ref(false);
    let selectedCategory = ref('');
    let selectedCategoryAssets = ref([]);

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

    function updateSelectedCategory(category, assetsName) {
        selectedCategory.value = category;
        console.log('catName', categoryName);
        console.log('assets', assetsName);
        selectedCategoryAssets.value = assetsName;
        catalogShow.value = true;
        fetchCatalogElements(categoryName, assetsName);
    }
</script>

<template>
    <div class="editor__container">
        <!-- <ComicPanels :comic="comic" @active-panel-change="activePanelIndex = $event"></ComicPanels> -->
        <p>home page</p>
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
    <button>
        <NuxtLink
            :to="{
                name: 'export',
                path: '/export',
            }"
            >See Preview
        </NuxtLink>
    </button>

    <CatalogNavigation :categories="catalogStructure.categories" @categorySelected="updateSelectedCategory" />
    <CatalogStructure
        :iconName="iconName"
        :title="selectedCategory.name"
        :show="catalogShow"
        :selectedCategoryAssets="catalogElements"
        :selectedCategory="selectedCategory"
        @close="catalogShow = false"
        @catalogChanged="(e) => fetchCatalogElements(e.category, e.subCategory, e.filter)"
    />
</template>

<style scoped lang="scss">
    .editor__container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: $primary;
    }
</style>

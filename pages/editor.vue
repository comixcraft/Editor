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
    let selectedCategory = ref({});

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
                console.log(catalogElements.value.length);
            })
            .catch((error) => {
                createError(error);
            });
    }

    onMounted(() => {
        fetchCatalogElements();
    });

    function updateSelectedCategory(category) {
        selectedCategory.value = category;
        catalogShow.value = true;
        fetchCatalogElements(category.name, [], []);
    }
</script>

<template>
    <div class="editor__container">
        <ComicPanels :comic="comic" @active-panel-change="activePanelIndex = $event"></ComicPanels>
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
        :title="selectedCategory.name"
        :show="catalogShow"
        :selectedCategoryAssets="catalogElements"
        :selectedCategory="selectedCategory"
        @close="catalogShow = false"
        @add-element="addElementToActivePanel"
        @catalog-changed="(e) => fetchCatalogElements(e.category, e.subCategory, e.filter)"
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

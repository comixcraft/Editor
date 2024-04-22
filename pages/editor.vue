<script setup>
    import ComicPanels from '~/components/ComicPanels.vue';

    definePageMeta({
        middleware: ['comic-defined'],
    });

    const comicStore = useComicStore();

    let catalogElements = ref([]);
    let catalogStructure = ref([]);
    const comic = reactive(comicStore.comic);
    console.log('comic', comic);

    await useFetch('/api/catalog/structure')
        .then((response) => {
            catalogStructure.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });

    function addElementToDisplay(e) {
        console.log(addElementToDisplay());
        //activePanel.value.addElement(e);
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

<template>
    <div class="editor__container">
        <ComicPanels :comic="comic"></ComicPanels>
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
            <CatalogContainer :assets="catalogElements" @add-element="addElementToDisplay"></CatalogContainer>
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
</template>

<style scoped lang="scss">
    .editor__container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>

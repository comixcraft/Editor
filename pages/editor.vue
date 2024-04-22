<script setup>
    definePageMeta({
        middleware: ['comic-defined'],
    });

    const comicStore = useComicStore();

    let catalogElements = ref([]);
    let catalogStructure = ref([]);
    const activePanel = ref(null);
    const stripHeight = ref(0);

    await useFetch('/api/catalog/structure')
        .then((response) => {
            catalogStructure.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });

    function addElementToDisplay(e) {
        activePanel.value.addElement(e);
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

    stripHeight.value = comicStore.comic.getPage(0).getStrip(0).height;
    activePanel.value = comicStore.comic.getPage(0).getStrip(0).getPanel(0);

    onMounted(() => {
        fetchCatalogElements();
    });
</script>

<template>
    <div class="editor__container">
        <WrapperCanvas :height="stripHeight" :panel="activePanel"></WrapperCanvas>
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

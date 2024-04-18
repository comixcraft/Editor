<script setup>
    // Values should come from the template chosen before opening the editor

    const canvasWidth = ref(450);
    const canvasHeight = ref(750);
    let catalogElements = ref([]);
    let catalogStructure = ref([]);

    await useFetch('/api/catalog/structure')
        .then((response) => {
            catalogStructure.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });

    function fetchCatalogElements(category = [], subCategory = [], filter = []) {
        useFetch('/api/catalog/', {
            method: 'POST',
            body: {
                category: category,
                subCategory: subCategory,
                filter: [],
            },
        })
            .then((response) => {
                console.log('response', response);
                catalogElements.value = response.data.value;
            })
            .catch((error) => {
                createError(error);
            });
    }
</script>

<template>
    <div class="container">
        <WrapperCanvas></WrapperCanvas>
        <div>
            <CatalogSearch
                placeholder="happy, barista, ..."
                :filters="catalogStructure.categories[0].subCategories[0].filter"
                @search="
                    (n) => {
                        console.log(n);
                        fetchCatalogElements(
                            catalogStructure.categories[0].name,
                            catalogStructure.categories[0].subCategories[0].name,
                            n
                        );
                    }
                "
            />
            <CatalogContainer :assets="catalogElements"></CatalogContainer>
        </div>
    </div>

    <button>
        <NuxtLink
            :to="{
                name: 'export',
                path: '/export',
                query: { width: canvasWidth, height: canvasHeight },
            }"
            >See Preview
        </NuxtLink>
    </button>
</template>

<style scoped>
    .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>

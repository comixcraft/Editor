<script setup>
    // Values should come from the template chosen before opening the editor
    const canvasWidth = ref(450);
    const canvasHeight = ref(750);
    useFetch('/api/catalog/structure')
        .then((response) => {
            console.log('Catalog structure', response.data.value);
        })
        .catch((error) => {
            createError(error);
        });

    let catalogElements = ref([]);
    await useFetch('/api/catalog/', {
        method: 'POST',
        body: {
            // category: ['characters'],
            // subCategory: ['single', 'multiple'],
            // filter: ['old']
        },
    })
        .then((response) => {
            catalogElements.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });
</script>

<template>
    <div class="container">
        <WrapperCanvas></WrapperCanvas>
        <CatalogContainer :assets="catalogElements"></CatalogContainer>
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
    <button>
        <NuxtLink :to="{ name: 'layoutTesting', path: '/layoutTesting' }">chaos</NuxtLink>
    </button>
</template>

<style scoped>
    .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>

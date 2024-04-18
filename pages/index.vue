<script setup>
    import Panel from '~/utils/Classes/Panel.js';

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

    // for testing matter
    let panelTest = new Panel(600, 'none');
    function addElementToDisplay(e) {
        panelTest.addElement(e);
    }

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
        <WrapperCanvas :panel="panelTest"></WrapperCanvas>
        <CatalogContainer :assets="catalogElements" @add-element="addElementToDisplay"> </CatalogContainer>
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

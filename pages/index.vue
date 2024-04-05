<script setup>
useFetch('/api/catalog/structure')
    .then((response) => {
        console.log('Catalog structure', response.data.value)
    })
    .catch((error) => {
        createError(error);
    })

let catalogElements = [];
await useFetch('/api/catalog/', {
  method: 'POST',
  body: {
    // category: ['characters'],
    // subCategory: ['single', 'multiple'],
    // filter: ['old']
  }
})
    .then((response) => {
        catalogElements.value = response.data.value;
    })
    .catch((error) => {
        createError(error);
    })
</script>

<template>
    <div class="container">
        <WrapperCanvas></WrapperCanvas>
        <CatalogContainer
            :assets="catalogElements.value"
        ></CatalogContainer>
    </div>

</template>

<style scoped>
    .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>
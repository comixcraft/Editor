<script setup>

let catalogueElements = [];

await useFetch('/api/catalogue/', {
  method: 'POST',
  body: {
    category: 'characters',
    subCategory: ['single', 'multiple'],
  }
})
    .then((response) => {
        catalogueElements.value = response.data.value;
        console.log(catalogueElements.value)
    })
    .catch((error) => {
        createError(error);
    })
</script>

<template>
    <div class="container">
        <WrapperCanvas></WrapperCanvas>
        <CatalogContainer
            :assets="catalogueElements.value"
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
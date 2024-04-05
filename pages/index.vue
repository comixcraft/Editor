<script setup>

let catalogElements = [];

await useFetch('/api/catalog/', {
  method: 'POST',
  body: {
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
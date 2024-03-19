<script setup>
for (const [key, value] of Object.entries(sampleCatalog)) {
  console.log(`${key}: ${value.file_location}`);
}
</script>


<template>

    <div class="container" id="catalog-container">
        <div class="catalogPreviewWrapper" v-for="value in sampleCatalog">
            <CatalogImagePreview :alt-text="value.name" :url="value.file_location"/>
        </div>
    </div>

</template>

<style scoped>

    .container {
        width: 300px;
        height: 700px;
        border: 1px solid #000;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .catalogPreviewWrapper {
        position: relative;
        top: 0;
        width: auto;
        height: 100%;
        border: 1px solid black;
    }

</style>
<script setup>
for (const [key, value] of Object.entries(sampleCatalog)) {
  console.log(`${key}: ${value.file_location}`);
}

function returnAttrOnClick(event) {
    let tempObj = {name: event.target.alt, src: event.target.src};
    console.log(tempObj);
    return tempObj;
}

</script>


<template>

    <div class="container" id="catalog-container">
        <div class="catalogPreviewWrapper" v-for="value in sampleCatalog">
            <CatalogImagePreview :alt-text="value.name" :url="value.file_location" @click="returnAttrOnClick"/>
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
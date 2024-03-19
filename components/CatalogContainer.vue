<script setup>

    function returnAttrOnClick(event) {
        let tempObj = {name: event.target.alt, src: event.target.src};
        elementsInCanvas.value.push(tempObj)
        return tempObj;
    }

</script>


<template>

    <div class="container" id="catalog-container">
        <div id="aligner">
            <div class="catalogPreviewWrapper" v-for="value in sampleCatalog">
                <CatalogImagePreview :alt-text="value.name" :url="value.file_location" @click="returnAttrOnClick"/>
            </div>
        </div>
    </div>

</template>

<style scoped>

    .container {
        position: relative;
        width: 300px;
        height: 700px;
        border: 1px solid #000;
        overflow-y: scroll;
    }
    
    #aligner {
        position: absolute;
        top: 0;
        padding: 10px 0;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .catalogPreviewWrapper {
        width: auto;
        height: 100%;
        border: 1px solid black;
    }

</style>
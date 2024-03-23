<script setup>

    import ElementDS from '../utils/Classes/Element.js'

    function addNewElementToDisplay(event) {
        let fixedHeight = 200;
        let name = event.target.alt; 
        let src = event.target.src;
        let width = (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight;

        // width, height, alt, src
        let tempEl = new ElementDS(width, fixedHeight, name, src)
        elementsInCanvas.value.set(elementsInCanvas.value.size + 1, tempEl)
    }

</script>


<template>

    <div class="container" id="catalog-container">
        <div id="aligner">
            <div class="catalogPreviewWrapper" v-for="value in sampleCatalog">
                <CatalogImagePreview :alt-text="value.name" :url="value.file_location" @click="addNewElementToDisplay"/>
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
        overflow-y: scroll !important;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
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
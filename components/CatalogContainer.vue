<script setup>

    function returnAttrOnClick(event) {
        let fixedHeight = 200;
        let tempObj = {
            name: event.target.alt, 
            src: event.target.src,
            height: fixedHeight,
            width: (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight
        };
        elementsInCanvas.value.push(tempObj)
        elInCanvas.value.set(elInCanvas.value.size + 1, tempObj)
        console.log(elInCanvas.value)
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
<script setup>
    import ElementDS from "~/utils/Classes/Element.js";

    defineProps({
      assets: Array,
    })

    function addNewElementToDisplay(event) {
        elementsCounter.value++;
        let fixedHeight = 200;
        let name = event.target.alt; 
        let src = event.target.src;
        let width = (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight;
        let availableInteger = 1;
        while (elementsInCanvas.value.has(availableInteger)) {
            availableInteger++;
        }
        // width, height, alt, src
        let tempEl = new ElementDS(width, fixedHeight, name, src)
        elementsInCanvas.value.set(availableInteger, tempEl)
    }

</script>


<template>
    <div class="catalog-scroll-container">
      <CatalogImagePreview
          v-for="asset in assets"
          :alt-text="asset.name"
          :url="asset.file_location"
          @click="addNewElementToDisplay"
      />
    </div>
</template>

<style scoped>
    .catalog-scroll-container {
        width: 300px;
        height: 700px;
        padding: 25px 0;
        border: 1px solid #000;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }
</style>
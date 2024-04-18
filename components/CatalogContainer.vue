<script setup>
    import ElementDS from '~/utils/Classes/Element.js';

    defineProps({
        assets: Array,
    });

    function addNewElementToDisplay(event) {
        elementsCounter.value++;
        let fixedHeight = 200;
        let name = event.target.alt;
        let src = event.target.src;
        let width = (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight;
        let availableInteger = 1;
        while (elementsInCanvas.has(availableInteger)) {
            availableInteger++;
        }
        // width, height, alt, src
        let tempEl = new ElementDS(width, fixedHeight, name, src);
        elementsInCanvas.set(availableInteger, tempEl);
    }
</script>

<template>
    <div class="catalog__scroll-container">
        <CatalogImagePreview
            v-for="asset in assets"
            :key="asset.id"
            :alt-text="asset.name"
            :url="asset.file_location"
            @click="addNewElementToDisplay"
        />
    </div>
</template>

<style lang="scss" scoped>
    .catalog__scroll-container {
        width: 300px;
        height: 700px;
        padding: $spacer-4 0;
        border: $border-width solid $black;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: $spacer-4;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }
</style>

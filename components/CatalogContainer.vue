<!-- CatalogContainer -->
<script setup>
    import ElementDS from '~/utils/Classes/Element.js';

    const props = defineProps({
        assets: Array,
    });

    const emit = defineEmits(['addElement']);

    function addNewElementToDisplay(event) {
        let fixedHeight = 200;
        console.log(props.assets);
        let name = event.target.alt;
        let src = event.target.src;
        let width = (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight;
        // width, height, alt, src
        let tempEl = new ElementDS(width, fixedHeight, name, src);
        emit('addElement', tempEl);
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
        width: fit-content;
        height: 700px;
        padding: $spacer-4 0;
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

<script setup>
    import ElementDS from '~/utils/Classes/Element.js';
    import Asset from '~/utils/Classes/Asset.js';

    const props = defineProps({
        assets: Array,
    });

    const comicStore = useComicStore();

    function addNewElementToDisplay(event) {
        let fixedHeight = 200;
        let name = event.target.alt;
        let src = event.target.src;
        let width = (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight;
        let newAsset = new Asset(src);
        let tempEl = new ElementDS(width, fixedHeight, name, src, newAsset);
        comicStore.bus.emit('add-element', tempEl);
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
        width: auto;
        height: 100vh;
        padding: $spacer-4 0;
        border: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: start;
        gap: $spacer-4;
        padding-bottom: 300px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }

    @include media-breakpoint-up(lg) {
        .catalog__scroll-container {
            width: auto;
            height: auto;
            padding: $spacer-4 0;
            border: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: left;
            gap: $spacer-4;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            -ms-overflow-style: none;
        }
    }
</style>

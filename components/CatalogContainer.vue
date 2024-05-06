<script setup>
    import ElementDS from '~/utils/Classes/Element.js';
    import Asset from '~/utils/Classes/Asset.js';

    const props = defineProps({
        assets: Array,
    });

    const comicStore = useComicStore();

    let unsubscribeFromAddElement; // Store the unsubscribe function

    function addNewElementToDisplay(event) {
        comicStore.bus.emit('add-element', event);
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
        padding: $spacer-4 0 300px 0;
        border: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: flex-start;
        gap: $spacer-4;
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

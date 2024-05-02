<!-- CatalogContainer -->
<script setup>
    import ElementDS from '~/utils/Classes/Element.js';
    import Asset from '~/utils/Classes/Asset.js';

    const props = defineProps({
        assets: Array,
    });

    const emit = defineEmits(['addElement']);
    const comicStore = useComicStore();

    function addNewElementToDisplay(event) {
        let fixedHeight = 200;
        let name = event.target.alt;
        let src = event.target.src;
        let width = (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight;
        let newAsset = new Asset(src);
        let tempEl = new ElementDS(width, fixedHeight, name, src, newAsset);
        //emit('addElement', tempEl);
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
        padding: $spacer-4 0;
        display: flex;
        width: auto;
        height: 75vh;
        flex-wrap: wrap;
        justify-content: center;
        padding-bottom: 100px;
        align-items: center;
        gap: $spacer-3;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
        mask-image: linear-gradient(to bottom, black calc(100% - 48px), transparent 100%);
    }

    @include media-breakpoint-up(lg) {
        .catalog__scroll-container {
            height: 85vh;
        }
    }
</style>

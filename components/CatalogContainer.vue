<script setup>
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

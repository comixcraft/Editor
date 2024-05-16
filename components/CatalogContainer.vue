<script setup>
    const props = defineProps({
        assets: Array,
    });

    const emit = defineEmits(['element-added']);

    const comicStore = useComicStore();

    let unsubscribeFromAddElement; // Store the unsubscribe function

    function addNewElementToDisplay(event) {
        emit('element-added');
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
        margin-top: $spacer-3;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        gap: $spacer-4;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }
</style>

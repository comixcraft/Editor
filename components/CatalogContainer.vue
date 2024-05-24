<script setup>
    const props = defineProps({
        scrollToTop: Boolean,
        assets: Array,
    });

    const emit = defineEmits(['element-added', 'scrolled-top']);

    const comicStore = useComicStore();

    function addNewElementToDisplay(event) {
        emit('element-added');
        comicStore.bus.emit('add-element', event);
    }

    // Define a ref for the scroll container
    const scrollContainerRef = ref(null);

    watch(
        () => props.scrollToTop,
        () => scrollTop()
    );

    function scrollTop() {
        scrollContainerRef.value.scrollTo({ top: 0, behavior: 'smooth' });
        emit('scrolled-top');
    }
</script>

<template>
    <div ref="scrollContainerRef" class="catalog__scroll-container">
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
        overflow-y: auto;
        // -webkit-overflow-scrolling: touch;
        // -ms-overflow-style: none;
        scroll-behavior: smooth;
    }
</style>

<script setup>
    import { ref, watch, nextTick } from 'vue';

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

    const scrollContainerRef = ref(null);
    const firstElementRef = ref(null);

    watch(
        () => props.scrollToTop,
        () => scrollTop()
    );

    function scrollTop() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Scroll using the window object on mobile devices
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll using the scrollable container reference on desktop
            if (scrollContainerRef.value) {
                scrollContainerRef.value.scrollTo({ top: 0, behavior: 'smooth' });
                emit('scrolled-top');

                nextTick(() => {
                    if (firstElementRef.value?.$el) {
                        firstElementRef.value.$el.focus();
                    }
                });
            }
        }
    }
</script>
<template>
    <div ref="scrollContainerRef" class="catalog__scroll-container">
        <CatalogImagePreview
            v-for="(asset, index) in assets"
            :key="asset.id"
            :alt-text="asset.name"
            :url="asset.file_location"
            @click="addNewElementToDisplay"
            :ref="index === 0 ? 'firstElementRef' : undefined"
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
        scroll-behavior: smooth;
    }
</style>

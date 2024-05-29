<script setup>
    import { nextTick } from 'vue';

    const props = defineProps({
        assets: Array,
    });

    const emit = defineEmits(['element-added']);

    const comicStore = useComicStore();
    const catalogContainer = ref(null);

    let unsubscribeFromAddElement;

    function addNewElementToDisplay(event) {
        emit('element-added');
        comicStore.bus.emit('add-element', event);
    }

    watch(
        () => props.assets,
        () => {
            nextTick(() => {
                if (catalogContainer.value && catalogContainer.value.firstElementChild) {
                    catalogContainer.value.firstElementChild.scrollIntoView({
                        behavior: 'smooth',
                    });
                }
            });
        }
    );
</script>

<template>
    <div class="catalog__scroll-container" ref="catalogContainer">
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
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }
</style>

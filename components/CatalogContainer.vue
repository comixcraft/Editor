<script setup>
    const props = defineProps({
        assets: Array,
    });

    const emit = defineEmits(['element-added']);

    const comicStore = useComicStore();
    const catalogContainer = ref(null);

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
        <div class="empty-display" v-if="props.assets?.length === 0">
            <img src="/public/Barista explaining6.png" alt="" class="empty-display__img" draggable="false" />
            <div class="empty-display__text">
                <h3>No assets fit the description</h3>
                <p>Try to adjust the filters or searched terms.</p>
            </div>
        </div>
        <SpinnerLoader class="catalog__loader" v-if="!props.assets" :loading="true" />
        <CatalogImagePreview
            v-else
            v-for="asset in assets"
            :key="asset.id"
            :alt-text="asset.name"
            :url="asset.file_location"
            @click="addNewElementToDisplay"
        />
    </div>
</template>

<style lang="scss" scoped>
    .catalog__loader {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .catalog__scroll-container {
        margin-top: $spacer-3;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        gap: $spacer-4;
        overflow-y: auto;
        user-select: none;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
        flex-grow: 1;
    }

    .empty-display {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        row-gap: $spacer-5;
        align-items: center;
        justify-content: center;

        &__img {
            max-width: 8rem !important;

            @include media-breakpoint-up(lg) {
                max-width: 70% !important;
            }
        }

        & h3 {
            color: $primary;
            @include media-breakpoint-up(lg) {
                margin-bottom: $spacer-5;
            }
        }

        &__text {
            text-align: center;
            row-gap: $spacer-4;
        }
    }
</style>

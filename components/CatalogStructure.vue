<!-- CatalogStructure -->

<script setup>
    import { defineProps } from 'vue';

    const emit = defineEmits(['catalogChanged']);

    const props = defineProps({
        iconName: { type: String, default: '' },
        title: { type: String },
        show: { type: Boolean, default: false },
        selectedCategoryAssets: {
            type: Array,
            default: () => [],
        },
        selectedCatalog: {
            type: Array,
            default: () => [],
        },
    });

    const selectedCategory = ref([]);
    const selectedSubCategory = ref([]);
    const selectedFilter = ref([]);

    function emitCatalogChanged() {
        emit('catalogChanged', {
            category: selectedCategory,
            subCategory: selectedSubCategory,
            filter: selectedFilter,
        });
    }
</script>

<template>
    <PopupOverlay :iconName="iconName" :title="title" :show="show">
        <CatalogSearch
            placeholder="happy, barista, ..."
            :filters="selectedCategoryAssets"
            @search="
                (selectedFilter) => {
                    fetchCatalogElements(selectedCategoryAssets, [], selectedFilter);
                }
            "
        />
        {{ selectedCatalog.subCategories }}
        <CatalogContainer :assets="selectedCategoryAssets" @add-element="addElementToActivePanel"></CatalogContainer>
    </PopupOverlay>
</template>

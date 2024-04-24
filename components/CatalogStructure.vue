<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        iconName: { type: String, default: '' },
        title: { type: String },
        show: { type: Boolean, default: false },
    });
</script>

<template>
    <PopupOverlay :iconName="iconName" :title="title" :show="show">
        <CatalogSearch
            placeholder="happy, barista, ..."
            :filters="selectedCategory"
            @search="
                (selectedFilter) => {
                    fetchCatalogElements(selectedCategory, [], selectedFilter);
                }
            "
        />
        <CatalogContainer :assets="catalogElements" @add-element="addElementToActivePanel"></CatalogContainer>
    </PopupOverlay>
</template>

<!-- CatalogStructure -->
<script setup>
    import { defineProps } from 'vue';

    const emit = defineEmits(['catalogChanged']);
    const selectedSubCategory = ref([]);
    const selectedFilter = ref([]);

    const props = defineProps({
        iconName: { type: String, default: '' },
        title: { type: String },
        show: { type: Boolean, default: false },
        selectedCategoryAssets: {
            type: Array,
            default: () => [],
        },
        selectedCategory: {
            type: Object,
            default: () => {},
        },
    });

    function emitCatalogChanged() {
        emit('catalogChanged', {
            category: props.selectedCategory.name,
            subCategory: selectedSubCategory.value.name,
            filter: selectedFilter,
        });
    }

    function updateSubSelectedCategory(subCategory) {
        selectedSubCategory.value = subCategory;
        emitCatalogChanged();
    }

    onMounted(() => {
        emitCatalogChanged();
    });
</script>

<template>
    <PopupOverlay :iconName="props.iconName" :title="props.title" :show="props.show">
        <CatalogSearch
            placeholder="happy, barista, ..."
            :filters="selectedCategory.subCategories[0].filter"
            @search="
                (selectedFilterFromSearch) => {
                    selectedFilter = selectedFilterFromSearch;
                    emitCatalogChanged();
                }
            "
        />
        <div class="catalogContainer">
            <CatalogContainer :assets="selectedCategoryAssets"></CatalogContainer>
        </div>
        <CatalogSubNavigation
            :subCategories="selectedCategory.subCategories"
            @subCategorySelected="updateSubSelectedCategory"
        ></CatalogSubNavigation>
    </PopupOverlay>
</template>

<style lang="scss" scoped>
    .catalogContainer {
        border: none;
    }
</style>

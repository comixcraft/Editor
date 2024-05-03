<script setup>
    const selectedSubCategory = ref({});
    const selectedFilter = ref([]);

    const emit = defineEmits(['catalogChanged']);

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

    // Watch for changes in selectedCategory
    watch(
        () => props.selectedCategory,
        () => {
            selectedSubCategory.value = {};
            // Reset selected filters when category changes
            selectedFilter.value = [];
            emitCatalogChanged();
        }
    );

    function emitCatalogChanged() {
        emit('catalogChanged', {
            category: props.selectedCategory.name,
            subCategory: selectedSubCategory.value.name,
            filter: selectedFilter.value,
        });
    }

    function updateSubSelectedCategory(subCategory) {
        if (selectedSubCategory.value === subCategory) {
            selectedSubCategory.value = {};
            selectedFilter.value = [];
        } else {
            selectedSubCategory.value = subCategory;
        }
        emitCatalogChanged();
    }

    onMounted(() => {
        emitCatalogChanged();
    });
</script>

<template>
    <div class="catalog__container">
        <div class="search-container">
            <CatalogSearch
                placeholder="happy, barista, ..."
                :filters="selectedSubCategory.filter"
                @search="
                    (selectedFilterFromSearch) => {
                        selectedFilter = selectedFilterFromSearch;
                        emitCatalogChanged();
                    }
                "
            />
        </div>
        <CatalogContainer :assets="selectedCategoryAssets"></CatalogContainer>
        <CatalogSubNavigation
            v-if="selectedCategory.name && selectedCategory.name !== 'All Assets'"
            :subCategories="selectedCategory.subCategories"
            @subCategorySelected="updateSubSelectedCategory"
        ></CatalogSubNavigation>
    </div>
</template>

<style lang="scss" scoped>
    .catalog__container {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: $spacer-2;
    }
</style>

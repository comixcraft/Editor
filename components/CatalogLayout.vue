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

    // Watch for changes in selectedSubCategory
    watch(
        () => selectedSubCategory.value,
        () => {
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
    <div class="catalog">
        <CatalogSearch
            class="p-2"
            placeholder="happy, barista, ..."
            :filters="selectedSubCategory.filter"
            @search="
                (selectedFilterFromSearch) => {
                    selectedFilter = selectedFilterFromSearch;
                    emitCatalogChanged();
                }
            "
        />
        <CatalogContainer class="catalog__container" :assets="selectedCategoryAssets"></CatalogContainer>
        <span class="flex-grow-1"></span>
        <CatalogSubNavigation
            class="catalog__sub-navigation"
            v-if="selectedCategory.name && selectedCategory.name !== 'All Assets'"
            :subCategories="selectedCategory.subCategories"
            @subCategorySelected="updateSubSelectedCategory"
        ></CatalogSubNavigation>
    </div>
</template>

<style lang="scss" scoped>
    .catalog {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;

        &__container {
            padding: $spacer-2;
        }
    }
</style>

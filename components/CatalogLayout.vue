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

    watch(
        () => props.selectedCategory,
        () => {
            selectedSubCategory.value = {};
        }
    );

    function emitCatalogChanged() {
        emit('catalogChanged', {
            category: props.selectedCategory.name,
            subCategory: selectedSubCategory.value.name,
            filter: selectedFilter,
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
    <div class="catalog__container">
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
        <CatalogContainer :assets="selectedCategoryAssets"></CatalogContainer>
        <CatalogSubNavigation
            v-if="selectedCategory.name !== 'All Assets'"
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

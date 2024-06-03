<script setup>
    const selectedSubCategory = ref({});
    const selectedFilter = ref([]);

    const emit = defineEmits(['catalogChanged', 'element-added']);

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
        selectedFilter.value = [];
        emitCatalogChanged();
    }

    onMounted(() => {
        emitCatalogChanged();
    });
</script>

<template>
    <div class="catalog">
        <CatalogSearch
            class="catalog__search"
            placeholder="happy, barista, ..."
            :filters="selectedSubCategory.filter"
            :subCategory="selectedSubCategory"
            :category="selectedCategory"
            @search="
                (selectedFilterFromSearch) => {
                    selectedFilter = selectedFilterFromSearch;
                    emitCatalogChanged();
                }
            "
        />
        <CatalogContainer
            class="catalog__container"
            :assets="selectedCategoryAssets"
            @element-added="$emit('element-added')"
        ></CatalogContainer>
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

        &__search {
            user-select: none;
            position: sticky;
            top: $spacer-4;
            background-color: $white;
            padding-left: $spacer-3;
            padding-right: $spacer-3;
            z-index: 2;
        }

        &__sub-navigation {
            position: sticky;
            bottom: 0;
        }

        &__container {
            padding: 0 $spacer-2 $spacer-2 $spacer-2;
        }
    }
    @include media-breakpoint-up(md) {
        .catalog {
            padding-top: 3rem;
        }
    }

    @include media-breakpoint-up(lg) {
        .catalog {
            padding-top: 0;
        }
    }
</style>

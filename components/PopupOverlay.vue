<script setup>
    import iconConfig from '../config/iconsConfig';

    const selectedSubCategory = ref([]);
    const selectedFilter = ref([]);

    const emit = defineEmits(['close', 'catalogChanged', 'addElementToActivePanel']);

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
        if (selectedSubCategory.value === subCategory) {
            selectedSubCategory.value = [];
        } else {
            selectedSubCategory.value = subCategory;
        }
        emitCatalogChanged();
    }

    // Functionality to add new element to display
    function addElementToActivePanel() {
        emit('addElementToActivePanel');
    }

    onMounted(() => {
        emitCatalogChanged();
    });
</script>

<template>
    <div>
        <div v-if="show" class="overlay">
            <div class="overlay__content">
                <div class="navigation">
                    <div class="category__description">
                        <span class="edit-icon icon text-primary">
                            {{ iconConfig.get(selectedCategory.name) || 'default_icon' }}
                        </span>
                        <div class="navigation__title h3">
                            {{ title }}
                        </div>
                    </div>
                    <div class="navigation__icon icon" @click="$emit('close')">close</div>
                </div>
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
                <div class="catalog__container">
                    <CatalogContainer
                        :assets="selectedCategoryAssets"
                        @click="addElementToActivePanel"
                    ></CatalogContainer>
                </div>
            </div>
            <CatalogSubNavigation
                v-if="selectedCategory.name !== 'All Assets'"
                :subCategories="selectedCategory.subCategories"
                @subCategorySelected="updateSubSelectedCategory"
            ></CatalogSubNavigation>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $white;
        margin: $spacer-2;
        color: $primary;
        cursor: pointer;
    }

    .navigation__title {
        font-size: 16px;
    }

    .category__description {
        display: flex;
        gap: $spacer-2;
    }
    .overlay {
        background-color: $white;
        border-top-left-radius: $border-radius-xl;
        border-top-right-radius: $border-radius-xl;
        padding-top: $spacer-2;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .overlay__content {
        height: 100%;
    }

    .icon {
        color: $grey-70;
    }

    @include media-breakpoint-up(lg) {
        .navigation__title {
            font-size: 18px;
        }
    }
</style>

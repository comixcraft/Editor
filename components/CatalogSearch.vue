<script setup>
    let activeFilters = ref([]);
    let searchTerm = ref('');
    let showAllFilters = ref(false);

    const emit = defineEmits(['search']);

    const props = defineProps({
        filters: {
            type: Array,
            default: () => [],
        },
        placeholder: {
            type: String,
            default: '',
        },
        subCategory: {
            type: Object,
        },
        category: {
            type: Object,
        },
    });

    watch(
        () => props.filters,
        (newFilters) => {
            if (newFilters.length == 0) {
                showAllFilters.value = false;
                activeFilters.value = []; // Reset active filters
            }
        }
    );

    // Watches for the changes in subcategory
    watch(
        () => props.subCategory,
        (newSubCategory, oldSubCategory) => {
            if (newSubCategory !== oldSubCategory) {
                resetFilters();
            }
        }
    );

    // Watches for the changes in category
    watch(
        () => props.category,
        (newCategory, oldCategory) => {
            if (newCategory !== oldCategory) {
                resetFilters();
            }
        }
    );

    const visibleFilters = computed(() => {
        return showAllFilters.value ? props.filters : activeFilters.value;
    });

    const canFilter = computed(() => {
        return props.filters.length > 0;
    });

    function toggleFilter(filter) {
        if (activeFilters.value.includes(filter)) {
            activeFilters.value = activeFilters.value.filter((activeFilter) => activeFilter !== filter);
        } else {
            activeFilters.value = [...activeFilters.value, filter];
        }
    }

    function emitSearch() {
        let searchArray = searchTerm.value ? searchTerm.value.split(',') : [];
        let searchArrayTrimmed = searchArray.map((searchTerm) => searchTerm.trim());
        emit('search', [...activeFilters.value, ...searchArrayTrimmed]);
    }

    function resetFilters() {
        activeFilters.value = []; // Reset active filters
        searchTerm.value = ''; // Reset search term
    }
</script>

<template>
    <div>
        <div class="search">
            <div class="search__field">
                <input
                    class="input search__input"
                    type="text"
                    :placeholder="placeholder"
                    @input="emitSearch"
                    v-model="searchTerm"
                />
                <span
                    v-if="searchTerm"
                    class="icon p5 search__clear"
                    @click="
                        () => {
                            searchTerm = '';
                            emitSearch();
                        }
                    "
                    title="Reset Search"
                    >close
                </span>
            </div>
            <span
                v-if="canFilter"
                class="icon search__tune"
                :class="{ 'search__tune--active': showAllFilters }"
                @click="showAllFilters = !showAllFilters"
                title="Apply Filters"
                >tune
            </span>
        </div>
        <div class="filter">
            <span
                v-for="filter in visibleFilters"
                :key="filter"
                class="filter__pill p5"
                :class="{ 'filter__pill--selected': activeFilters.includes(filter) }"
                @click="
                    () => {
                        toggleFilter(filter);
                        emitSearch();
                    }
                "
            >
                {{ filter }} <span class="icon pill__close p5" title="Remove Filter">close</span>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .filter {
        display: flex;
        gap: $spacer-2;
        flex-wrap: wrap;
        &__pill {
            cursor: pointer;
            padding: $spacer-1 $spacer-2;
            border: $border-width solid $secondary;
            color: $secondary;
            border-radius: $border-radius;
            display: flex;
            align-items: center;
            gap: $spacer-1;

            &:hover {
                @include media-breakpoint-up(lg) {
                    background-color: $secondary;
                    color: $white;
                }
            }

            &--selected {
                background-color: $secondary;
                color: $white;

                .pill__close {
                    display: inline-block;
                }
            }
        }
    }

    .search {
        display: flex;
        gap: $spacer-2;
        align-items: center;
        padding: $spacer-3 $spacer-2;

        &__field {
            position: relative;
            display: flex;
            align-items: center;
            gap: $spacer-2;
            flex-grow: 1;
        }

        &__clear {
            position: absolute;
            padding: $spacer-1;
            cursor: pointer;
            color: $medium-grey-100;
            right: $spacer-2;
            &:hover {
                @include media-breakpoint-up(lg) {
                    scale: 1.2;
                }
            }
        }

        &__input {
            width: 100%;
        }

        &__tune {
            cursor: pointer;
            padding: $spacer-1;
            border-radius: $border-radius;

            &:hover {
                @include media-breakpoint-up(lg) {
                    background-color: $secondary-50;
                    color: $white;
                }
            }

            &--active {
                color: $secondary;
            }
        }
    }

    .pill {
        &__close {
            display: none;
        }
    }
</style>

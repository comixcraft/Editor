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
        filterable: {
            type: Boolean,
            default: true,
        },
        placeholder: {
            type: String,
            default: '',
        },
    });

    const visibleFilters = computed(() => {
        return showAllFilters.value ? props.filters : activeFilters.value;
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
</script>

<template>
    <div>
        <div class="search">
            <span
                v-if="filterable"
                class="icon search__tune"
                :class="{ 'search__tune--active': showAllFilters }"
                @click="showAllFilters = !showAllFilters"
                >tune</span
            >
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
                >close
            </span>
        </div>
        <div class="filter">
            <span
                v-for="filter in visibleFilters"
                :key="filter"
                class="filter__pill"
                :class="{ 'filter__pill--selected': activeFilters.includes(filter) }"
                @click="
                    () => {
                        toggleFilter(filter);
                        emitSearch();
                    }
                "
            >
                {{ filter }} <span class="icon pill__close">close</span>
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
            margin-top: $spacer-2;
            cursor: pointer;
            padding: $spacer-1 $spacer-2;
            border: $border-width solid $secondary;
            color: $secondary;
            border-radius: $border-radius;
            display: flex;
            align-items: center;
            gap: $spacer-1;

            &:hover {
                background-color: $secondary;
                color: $white;
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
        position: relative;
        display: flex;
        gap: $spacer-2;
        align-items: center;

        &__clear {
            position: absolute;
            padding: $spacer-1;
            cursor: pointer;
            color: $medium-grey-100;
            right: $spacer-3;
        }

        &__input {
            flex-grow: 1;
        }

        &__tune {
            cursor: pointer;
            padding: $spacer-1;

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

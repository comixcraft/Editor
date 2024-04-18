<script setup>
    let activeFilters = ref([]);
    let searchTerm = ref('');

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
    });

    const allFilters = computed(() => {
        return [...new Set([...props.filters, ...activeFilters.value])];
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
            <span class="icon search__tune">tune</span>
            <input
                class="search__input"
                type="text"
                :placeholder="placeholder"
                @input="emitSearch"
                v-model="searchTerm"
            />
        </div>
        <div class="filter">
            <span
                v-for="filter in filters"
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
        display: flex;
        gap: $spacer-2;
        align-items: center;

        &__input {
            padding: $spacer-1 $spacer-2;
            border: $border-width solid $medium-grey-100;
            border-radius: $border-radius;
            flex-grow: 1;

            &:focus,
            &:active {
                border-color: $primary;
            }
        }

        &__tune {
            padding: $spacer-1;
        }
    }

    .pill {
        &__close {
            display: none;
        }
    }
</style>

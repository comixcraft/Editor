<script setup>
    import iconConfig from '../config/iconsConfig';

    const props = defineProps({
        subCategories: { type: Array },
    });

    const emit = defineEmits(['subCategorySelected']);

    let selectedSubCategory = ref(null);

    function selectSubCategory(subCategory) {
        if (selectedSubCategory.value === subCategory.name) {
            selectedSubCategory.value = null; // Deselect if already selected
        } else {
            selectedSubCategory.value = subCategory.name; // Select if not selected
        }
        emit('subCategorySelected', subCategory);
    }

    function showSubNavigation() {
        return selectedSubCategory.value !== null && !props.subCategories[0].name === 'All assets';
    }

    watch(
        () => props.subCategories,
        () => {
            selectedSubCategory.value = null;
        }
    );

    onMounted(() => {
        props.subCategories.length > 0;
    });
</script>

<template>
    <div v-if="showSubNavigation">
        <div class="sub__navigation">
            <div class="sub__navigation-inner">
                <button
                    v-for="(subCategory, index) in props.subCategories"
                    :key="index"
                    @click="selectSubCategory(subCategory)"
                    class="sub__btn"
                    :class="{ selected: selectedSubCategory === subCategory.name }"
                >
                    <span class="icon iconSpan">{{ iconConfig.get(subCategory.name) || 'default_icon' }}</span>
                    <span class="name p5">{{ subCategory.name }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .sub__navigation {
        display: flex;
        justify-content: space-between;
        background-color: $grey-80;
        box-shadow: $box-shadow-top-right;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }

    .sub__navigation-inner {
        display: flex;
        gap: $spacer-3;
        justify-content: center;
        padding: $spacer-3 $spacer-4;
        margin: auto;
    }

    .sub__btn {
        cursor: pointer;
        border-radius: $border-radius;
        background-color: $grey-80;
        color: $white;
        border: none;
        padding: $spacer-2;
        flex-shrink: 0;

        .name {
            color: $grey-50;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &.selected {
            background-color: $primary;
            color: $white;

            .name {
                color: $white;
            }
        }

        &:hover {
            @include media-breakpoint-up(lg) {
                background-color: $primary-50;
                color: $black-100;
                .name {
                    color: $black-100;
                }
            }
        }
    }

    .iconSpan {
        display: block;
    }
</style>

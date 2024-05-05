<script setup>
    import iconConfig from '../config/iconsConfig';

    const props = defineProps({
        subCategories: { type: Array },
    });

    const emit = defineEmits(['subCategorySelected']);

    let selectedSubCategory = ref(null);

    const selectSubCategory = (subCategory) => {
        if (selectedSubCategory.value === subCategory.name) {
            selectedSubCategory.value = null; // Deselect if already selected
        } else {
            selectedSubCategory.value = subCategory.name; // Select if not selected
        }
        emit('subCategorySelected', subCategory);
    };
    function showSubNavigation() {
        // Check if any subcategory is selected and not "All assets"
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
    <div class="sub__overlay p5" v-if="showSubNavigation">
        <div class="sub__navigation p5">
            <button
                v-for="(subCategory, index) in props.subCategories"
                :key="index"
                @click="selectSubCategory(subCategory)"
                class="sub__btn"
                :class="{ selected: selectedSubCategory === subCategory.name }"
            >
                <span class="icon"> {{ iconConfig.get(subCategory.name) || 'default_icon' }} </span>
                {{ subCategory.name }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .sub__overlay {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: $spacer-3;
        background-color: $white;
        box-shadow: $box-shadow-light;
    }

    .sub__navigation {
        display: flex;
        justify-content: space-around;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }

    .sub__btn {
        margin-top: $spacer-2;
        cursor: pointer;
        padding: $spacer-1 $spacer-2;
        border: none;
        border-radius: $border-radius;
        align-items: center;
        gap: $spacer-1;
        background-color: $white;

        &.selected {
            background-color: $primary;
            color: $white;
        }
    }

    .icon {
        display: block;
    }

    @include media-breakpoint-up(lg) {
        .sub__overlay {
            position: absolute;
        }
    }
</style>

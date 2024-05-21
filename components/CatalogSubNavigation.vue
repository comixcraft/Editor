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
    <div v-if="showSubNavigation">
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
    .sub__navigation {
        background-color: $white;
        box-shadow: $box-shadow-light;
        display: flex;
        justify-content: center;
        padding: $spacer-2 $spacer-2 0 $spacer-2;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }

    .sub__btn {
        cursor: pointer;
        padding: $spacer-3;
        border-radius: $border-radius;
        background-color: $white;
        border: none;

        &.selected {
            background-color: $primary;
            color: $white;
        }
    }

    .icon {
        display: block;
    }
</style>

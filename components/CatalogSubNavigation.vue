<script setup>
    import iconConfig from '../config/iconsConfig'; // Assuming you use this for icons
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        subCategories: { type: Array },
    });

    const emit = defineEmits(['subCategorySelected']);

    let selectedSubCategory = ref(null); // Track selected subcategory

    const selectSubCategory = (subCategory) => {
        if (selectedSubCategory.value === subCategory.name) {
            selectedSubCategory.value = null; // Deselect if already selected
        } else {
            selectedSubCategory.value = subCategory.name; // Select if not selected
        }
        emit('subCategorySelected', subCategory);
    };
</script>

<template>
    <div class="sub__overlay">
        <div class="sub__navigation">
            <button
                v-for="(subCategory, index) in props.subCategories"
                :key="index"
                @click="selectSubCategory(subCategory)"
                :class="{ selected: selectedSubCategory === subCategory.name }"
            >
                <span class="icon"> {{ iconConfig.get(subCategory.name) || 'default_icon' }} </span>
                {{ subCategory.name }}
            </button>
        </div>
        <div class="sub_overlay__content"><slot></slot></div>
    </div>
</template>

<style lang="scss" scoped>
    .sub__overlay {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 16px;
        background-color: $white;
        box-shadow: 0 3px 10px $grey-60;
    }

    .sub__navigation {
        display: flex;
        justify-content: space-around;
        box-shadow: 3px;
    }

    button {
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

    span {
        display: block;
    }
</style>

<script setup>
    import iconConfig from '../config/iconsConfig';
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        subCategories: { type: Array },
    });

    const emit = defineEmits(['subCategorySelected']);

    const selectSubCategory = (subCategory) => {
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
        background: $white;
        border: none;
        border-radius: $border-radius;
        padding: 10px;
    }

    button:hover {
        background-color: $primary;
        color: white;
        cursor: pointer;
    }

    span {
        display: block;
    }
</style>

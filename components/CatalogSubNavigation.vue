<script setup>
    import iconConfig from '../config/iconsConfig';

    const props = defineProps({
        subCategories: { type: Array },
    });

    const emit = defineEmits(['subCategorySelected']);

    let selectedSubCategory = ref(null);

    const selectSubCategory = (subCategory) => {
        if (selectedSubCategory.value === subCategory.name) {
            selectedSubCategory.value = null;
        } else {
            selectedSubCategory.value = subCategory.name;
        }
        emit('subCategorySelected', subCategory);
    };

    function showSubNavigation() {
        return selectedSubCategory.value !== null && props.subCategories[0].name !== 'All assets';
    }
</script>

<template>
    <div class="sub__overlay" v-if="showSubNavigation">
        <div class="sub__navigation">
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
        right: 0;
        left: 0;
        padding: $spacer-3;
        background-color: $white;
        box-shadow: $box-shadow-light;
    }

    .sub__navigation {
        display: flex;
        justify-content: space-around;
        box-shadow: 3px;
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

    span {
        display: block;
    }
</style>

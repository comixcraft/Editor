<script setup>
    import { ref } from 'vue';
    import iconConfig from '../config/iconsConfig';
    import ElementDS from '~/utils/Classes/Element.js';
    import Text from '~/utils/Classes/Text.js';

    let selectedCategory = ref(null);

    const props = defineProps({
        categories: { type: Array },
        textButtonName: { type: String, default: 'Text' },
        allAssetsButtonName: { type: String, default: 'All Assets' },
    });

    const emit = defineEmits(['categorySelected', 'selectAllAssets']);
    const comicStore = useComicStore();

    // Initialize selectedCategory with allAssetsButtonName by default
    selectedCategory.value = props.allAssetsButtonName;

    function selectCategory(category) {
        if (selectedCategory.value === category.name) {
        } else {
            selectedCategory.value = category.name; // Select category
            emit('categorySelected', category, []);
        }
    }

    function selectAllAssets() {
        selectedCategory.value = props.allAssetsButtonName; // Select "All Assets" button
        emit('selectAllAssets');
    }

    // Functionality to add new text to display
    function addNewTextToDisplay() {
        comicStore.bus.emit('add-element', null);
    }
</script>

<template>
    <div class="navigation p5">
        <button
            v-for="(category, index) in props.categories"
            :key="index"
            @click="selectCategory(category)"
            :class="{ selected: selectedCategory === category.name }"
        >
            <span class="icon navigation__icon"> {{ iconConfig.get(category.name) || 'default_icon' }} </span>
            {{ category.name }}
        </button>
        <button @click="addNewTextToDisplay()" :class="{ selected: selectedCategory === textButtonName }">
            <span class="icon navigation__icon"> {{ iconConfig.get(props.textButtonName) || 'default_icon' }} </span
            >{{ props.textButtonName }}
        </button>
        <button @click="selectAllAssets()" :class="{ selected: selectedCategory === allAssetsButtonName }">
            <span class="icon navigation__icon">
                {{ iconConfig.get(props.allAssetsButtonName) || 'default_icon' }} </span
            >{{ props.allAssetsButtonName }}
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .icon {
        display: block;
    }
    .navigation button {
        background-color: transparent;
        border: none;
        color: white;
    }
    .navigation__icon {
        height: 24px;
    }

    .navigation {
        display: flex;
        column-gap: $spacer-4;
    }
    @include media-breakpoint-up(lg) {
        .navigation {
            flex-direction: column;
            row-gap: $spacer-6;
        }

        .navigation button {
            &.selected {
                background-color: $secondary;
                color: $white;
                padding: $spacer-2;
                border-radius: $border-radius;
            }
        }
    }
</style>

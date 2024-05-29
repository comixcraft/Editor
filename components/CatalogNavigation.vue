<script setup>
    import iconConfig from '../config/iconsConfig';

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
        if (selectedCategory.value !== category.name) {
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
        <button @click="selectAllAssets()" :class="{ selected: selectedCategory === allAssetsButtonName }">
            <span class="icon navigation__icon">
                {{ iconConfig.get(props.allAssetsButtonName) || 'default_icon' }} </span
            >{{ props.allAssetsButtonName }}
        </button>
        <button
            v-for="(category, index) in props.categories"
            :key="index"
            @click="selectCategory(category)"
            :class="{ selected: selectedCategory === category.name }"
        >
            <span class="icon navigation__icon">
                {{ iconConfig.get(category.name) || 'default_icon' }}
            </span>
            {{ category.name }}
        </button>
        <button @click="addNewTextToDisplay()">
            <span class="icon navigation__icon">
                {{ iconConfig.get(props.textButtonName) || 'default_icon' }}
            </span>
            {{ props.textButtonName }}
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
        margin: 0;
        padding: $spacer-2;
        border-radius: $border-radius;
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
                border-radius: $border-radius;
            }
            &:hover {
                background-color: $secondary-50;
            }
        }
    }
</style>

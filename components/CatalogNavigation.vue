<script setup>
    import iconConfig from '../config/iconsConfig';

    const props = defineProps({
        categories: { type: Array },
        textButtonName: { type: String, default: 'Text' },
        allAssetsButtonName: { type: String, default: 'All Assets' },
    });

    const emit = defineEmits(['categorySelected', 'selectAllAssets', 'addNewTextToDisplay']);

    function selectCategory(category) {
        emit('categorySelected', category, []);
    }

    function selectAllAssets() {
        emit('selectAllAssets');
    }

    // Functionality to add new text to display
    function addNewTextToDisplay() {
        emit('addNewTextToDisplay');
    }
</script>

<template>
    <div class="navigation">
        <button v-for="(category, index) in props.categories" :key="index" @click="selectCategory(category)">
            <span class="icon navigation__icon"> {{ iconConfig.get(category.name) || 'default_icon' }} </span>
            {{ category.name }}
        </button>
        <button @click="addNewTextToDisplay()">
            <span class="icon navigation__icon"> {{ iconConfig.get(props.textButtonName) || 'default_icon' }} </span
            >{{ props.textButtonName }}
        </button>
        <button @click="selectAllAssets()">
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
    }
</style>

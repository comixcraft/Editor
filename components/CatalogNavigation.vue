<script setup>
    import iconConfig from '../config/iconsConfig';
    import ElementDS from '~/utils/Classes/Element.js';
    import Text from '~/utils/Classes/Text.js';

    const props = defineProps({
        categories: { type: Array },
        textButtonName: { type: String, default: 'Text' },
        allAssetsButtonName: { type: String, default: 'All Assets' },
    });

    const emit = defineEmits(['categorySelected', 'selectAllAssets', 'addNewTextToDisplay']);
    const comicStore = useComicStore();

    function selectCategory(category) {
        emit('categorySelected', category, []);
    }

    function selectAllAssets() {
        emit('selectAllAssets');
    }

    // Functionality to add new text to display
    function addNewTextToDisplay() {
        let fixedHeight = 200;
        let src = '';
        let width = 200;
        let name = 'Double-click to edit me.';
        let type = new Text(name, 24, 'Pangolin');
        let tempEl = new ElementDS(width, fixedHeight, name, src, type);
        comicStore.bus.emit('add-element', tempEl);
    }
</script>

<template>
    <div class="navigation">
        <button v-for="(category, index) in props.categories" :key="index" @click="selectCategory(category)">
            <span class="icon"> {{ iconConfig.get(category.name) || 'default_icon' }} </span>
            {{ category.name }}
        </button>
        <button @click="addNewTextToDisplay()">
            <span class="icon"> {{ iconConfig.get(props.textButtonName) || 'default_icon' }} </span
            >{{ props.textButtonName }}
        </button>
        <button @click="selectAllAssets()">
            <span class="icon"> {{ iconConfig.get(props.allAssetsButtonName) || 'default_icon' }} </span
            >{{ props.allAssetsButtonName }}
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .icon {
        display: block;
    }
</style>

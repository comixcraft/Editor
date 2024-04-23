<script setup>
    import templatePanelConfig from '/config/templatePanelConfig.js';
    import templateStripConfig from '/config/templateStripConfig.js';

    const comicStore = useComicStore();

    let selectedComicConfiguration = ref(null);

    function createComic(config) {
        if (!config) return;

        comicStore.createComicWithConfig({ ...config });
        return navigateTo('/editor');
    }
</script>

<template>
    <div>
        <div class="d-flex flex-wrap gap-3">
            <TemplateDisplay
                @select-template="selectedComicConfiguration = $event"
                v-for="option in templatePanelConfig"
                :key="option.title"
                :title="option.title"
                :preview="option.preview"
                :config="option.config"
                :selected="option.title === selectedComicConfiguration?.title"
            />
        </div>
        <div class="d-flex flex-wrap gap-3">
            <TemplateDisplay
                @select-template="selectedComicConfiguration = $event"
                v-for="option in templateStripConfig"
                :key="option.title"
                :title="option.title"
                :preview="option.preview"
                :config="option.config"
                :selected="option.title === selectedComicConfiguration?.title"
            />
        </div>
    </div>
    <button @click="createComic(selectedComicConfiguration?.config)" :disabled="!selectedComicConfiguration">
        Create Comic
    </button>
    <button @click="addNewTextToDisplay">Add a text</button>
</template>

<style scoped lang="scss"></style>

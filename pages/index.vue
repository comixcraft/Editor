<script setup>
    const comicStore = useComicStore();

    let panelOptions = reactive([
        {
            title: 'Single',
            preview: '/frames/preview/Preview_Single.png',
            config: { height: 524, panels: [{ width: 380, border: '/frames/Frame-Single.png' }] },
        },
        {
            title: 'Double',
            preview: '/frames/preview/Preview_Double.png',
            config: { height: 524, panels: [{ width: 776, border: '/frames/Frame-Double.png' }] },
        },
        {
            title: 'Triple',
            preview: '/frames/preview/Preview_Triple.png',
            config: { height: 524, panels: [{ width: 1164, border: '/frames/Frame-Triple.png' }] },
        },
    ]);

    let stripOptions = reactive([
        {
            title: 'Three Single',
            preview: '/frames/preview/Preview_Single-Single-Single.png',
            config: {
                height: 524,
                panels: [
                    { width: 380, border: '/frames/Frame-Single.png' },
                    { width: 380, border: '/frames/Frame-Single.png' },
                    { width: 380, border: '/frames/Frame-Single.png' },
                ],
            },
        },
        {
            title: 'Double and Single',
            preview: '/frames/preview/Preview_Double-Single.png',
            config: {
                height: 524,
                panels: [
                    { width: 776, border: '/frames/Frame-Double.png' },
                    { width: 380, border: '/frames/Frame-Single.png' },
                ],
            },
        },
        {
            title: 'Single and Double',
            preview: '/frames/preview/Preview_Single-Double.png',
            config: {
                height: 524,
                panels: [
                    { width: 776, border: '/frames/Frame-Double.png' },
                    { width: 380, border: '/frames/Frame-Single.png' },
                ],
            },
        },
        {
            title: 'Two Single',
            preview: '/frames/preview/Preview_Single-Single.png',
            config: {
                height: 524,
                panels: [
                    { width: 380, border: '/frames/Frame-Single.png' },
                    { width: 380, border: '/frames/Frame-Single.png' },
                ],
            },
        },
    ]);

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
                v-for="option in panelOptions"
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
                v-for="option in stripOptions"
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
</template>

<style scoped lang="scss"></style>

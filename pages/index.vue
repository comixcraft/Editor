<script setup>
    let panelOptions = reactive([
        {
            title: 'Single',
            preview: '/frames/preview/Preview_Single.png',
            config: { height: 1084, panels: [{ width: 759, border: '/frames/Frame-Single.png' }] },
        },
        {
            title: 'Double',
            preview: '/frames/preview/Preview_Double.png',
            config: { height: 1084, panels: [{ width: 1552, border: '/frames/Frame-Double.png' }] },
        },
        {
            title: 'Triple',
            preview: '/frames/preview/Preview_Triple.png',
            config: { height: 1084, panels: [{ width: 2327, border: '/frames/Frame-Triple.png' }] },
        },
    ]);

    let stripOptions = reactive([
        {
            title: 'Three Single',
            preview: '/frames/preview/Preview_Single-Single-Single.png',
            config: {
                height: 1084,
                panels: [
                    { width: 759, border: '/frames/Frame-Single.png' },
                    { width: 759, border: '/frames/Frame-Single.png' },
                    { width: 759, border: '/frames/Frame-Single.png' },
                ],
            },
        },
        {
            title: 'Double and Single',
            preview: '/frames/preview/Preview_Double-Single.png',
            config: {
                height: 1084,
                panels: [
                    { width: 1552, border: '/frames/Frame-Double.png' },
                    { width: 759, border: '/frames/Frame-Single.png' },
                ],
            },
        },
        {
            title: 'Single and Double',
            preview: '/frames/preview/Preview_Single-Double.png',
            config: {
                height: 1084,
                panels: [
                    { width: 1552, border: '/frames/Frame-Double.png' },
                    { width: 759, border: '/frames/Frame-Single.png' },
                ],
            },
        },
        {
            title: 'Two Single',
            preview: '/frames/preview/Preview_Single-Single.png',
            config: {
                height: 1084,
                panels: [
                    { width: 759, border: '/frames/Frame-Single.png' },
                    { width: 759, border: '/frames/Frame-Single.png' },
                ],
            },
        },
    ]);

    let selectedComicConfiguration = ref(null);
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
</template>

<style scoped lang="scss"></style>

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
        <div class="top-nav">
            <div class="top-nav__logo">comixcraft</div>
        </div>
        <div class="container-fluid pt-lg-5">
            <div class="row justify-content-center justify-content-lg-between align-items-center pb-3 pb-lg-0">
                <div class="col-lg-5">
                    <div class="welcome-text">
                        <div class="welcome">
                            <h1>Welcome to comixcraft!</h1>
                        </div>
                        <div>
                            <p>
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                                piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                                McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                                the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                                the cites of the word in classical literature, discovered the blah blah.
                            </p>
                        </div>
                        <div>
                            <p>
                                With plenty of templates and assets to choose from, the only limit is your imagination!
                                Get started now by choosing a template!
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 d-flex justify-content-center align-items-center">
                    <div class="comic-image">
                        <p>placeholder</p>
                    </div>
                </div>
            </div>
            <div class="templates">
                <h2>Templates</h2>
                <p class="font-italic">start by choosing a template</p>
                <h3>comic panels</h3>
                <p>A comic panel is a single frame within a comic strip.</p>
                <div class="comic-panels">
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
                <h3>comic strips</h3>
                <p>A comic strip consists of a series of panels.</p>
                <div class="comic-panels">
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
            <button
                class="start-btn"
                @click="createComic(selectedComicConfiguration?.config)"
                :disabled="!selectedComicConfiguration"
            >
                Create Comic
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .top-nav {
        display: flex;
        align-items: center;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        height: 80px;
        margin: 0;
    }
    .top-nav__logo {
        display: flex;
        flex-direction: row;
        margin-left: $spacer-3;
        justify-content: flex-start;
        justify-content: center;
        color: #fff;
    }

    .templates {
        background: var(--off-white-100, #f5f5f5);
        padding-top: $spacer-4;
    }
    .welcome-text {
        display: flex;
        flex-direction: column;
        padding: $spacer-2;
        margin-top: $spacer-3;
    }
    .welcome {
        display: flex;
    }
    .intro-text {
        display: flex;
        justify-content: left;
        width: 45vw;
        margin-top: $spacer-2;
    }
    .comic-image {
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 55vw;
    }

    .comic-panels {
        display: flex;
        gap: $spacer-3;
        width: 100%;
        overflow-x: auto;
        flex-wrap: nowrap;
        margin-top: $spacer-4;
    }

    .start-btn {
        display: flex;
        padding: $spacer-3;
        padding-left: $spacer-5;
        padding-right: $spacer-5;
        justify-content: center;
        align-items: center;
        gap: 8px;
        background-color: #f460b7;
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
    }
    .container-fluid {
        padding-left: $spacer-4;
        padding-right: $spacer-4;
    }
</style>

<template>
    <div>
        <div class="top-nav">
            <div class="top-nav__logo">comixcraft</div>
        </div>
        <div class="container-fluid px-0">
            <div class="intro">
                <div class="col-lg-5">
                    <div class="welcome-text">
                        <div class="welcome">
                            <h1>Welcome to comixcraft!</h1>
                        </div>
                        <div class="desktop-intro-text d-none d-lg-block">
                            <p>
                                Breathe life into your science lectures! Comixplain's intuitive editor lets you create
                                engaging science comics for any university subject – no sign-up needed. Simply jump in
                                and start making complex concepts clear and captivating for your students.
                            </p>
                        </div>
                        <div class="mobile-intro-text d-block d-lg-none">
                            <p>
                                Breathe life into your science lectures! Comixplain's intuitive editor lets you create
                                engaging science comics for any university subject – no sign-up needed. Simply jump in
                                and start making complex concepts clear and captivating for your students.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 justify-content-center">
                    <div class="comic-image">
                        <img src="/public/comic-image@2x.png" alt="" />
                    </div>
                </div>
            </div>
            <div class="templates">
                <h2>Templates</h2>
                <p class="font-italic">Start by choosing a template</p>

                <div class="comic-sections">
                    <h3>Comic Panels</h3>
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
                </div>
                <div class="comic-sections">
                    <h3>Comic Strips</h3>
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
            </div>
            <button
                class="start-btn"
                @click="createComic(selectedComicConfiguration?.config)"
                :disabled="!selectedComicConfiguration"
            >
                Start Comic Crafting
            </button>
        </div>
    </div>
</template>

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

<style scoped lang="scss">
    h2 {
        color: $primary-100;
    }
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

    .intro {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: $spacer-4 $spacer-5;
    }

    .templates {
        background: var(--off-white-100, #f5f5f5);
        padding: $spacer-4 $spacer-5;
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
    .font-italic {
        font-style: italic;
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
        max-width: 24vw;
    }

    .comic-sections {
        padding: $spacer-4 0;
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
        position: fixed;
        bottom: $spacer-6;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        z-index: 1;
        background-color: $secondary-100;
        color: $grey-0;
        padding: $spacer-3 $spacer-5;
        border-radius: $border-radius-lg;
        border: none;
    }

    .start-btn:hover {
        background-color: $secondary-50;
        cursor: pointer;
    }

    .start-btn:disabled {
        background-color: $secondary-30;
        cursor: not-allowed;
    }

    @media (max-width: 769px) {
        .comic-image {
            max-width: 32vw !important;
        }

        .start-btn {
            width: calc(100% - $spacer-6);
        }
    }
</style>

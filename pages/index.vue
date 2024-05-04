<script setup>
    import Comic from '~/utils/Classes/Comic';
    import Page from '~/utils/Classes/Page';
    import Strip from '~/utils/Classes/Strip';
    import Panel from '~/utils/Classes/Panel';
    import ElementDS from '~/utils/Classes/Element';
    import Asset from '~/utils/Classes/Asset';
    import Text from '~/utils/Classes/Text';
    import Position from '~/utils/Classes/Position';
    import templatePanelConfig from '/config/templatePanelConfig.js';
    import templateStripConfig from '/config/templateStripConfig.js';

    const comicStore = useComicStore();
    const draft = ref(null);

    onMounted(() => {
        draft.value = comicStore.getDraft();
    });

    let selectedComicConfiguration = ref(null);
    let draftSelected = ref(false);

    function deleteDraft() {
        comicStore.deleteDraft();
        draft.value = null;
    }

    function createComic(config) {
        draftSelected.value ? createComicFromDraft() : createNewComic(config);
    }

    function createNewComic(config) {
        console.log('new');
        if (!config) return;

        comicStore.createComicWithConfig({ ...config });
        return navigateTo('/editor');
    }

    function createComicFromDraft() {
        console.log('creation...');
        const refComic = comicStore.getDraft().value;
        const validateUndefinedAndNull = (value) => {
            // Check if the value is 'undefined' or 'null' as a string
            if (value === 'undefined' || value === 'null') {
                return value === 'undefined' ? undefined : null;
            }
            return value;
        };

        // create comic from localStorage reference
        let generatedComic = reactive(new Comic(refComic.name, refComic.title, refComic.creatorName));
        // create page(s) and add them to comic through class method
        refComic.pages.forEach((page, iPage) => {
            let tempPage = new Page();
            generatedComic.addPageToComic(tempPage);
            let currPage = generatedComic.pages[iPage];
            page.strips.forEach((strip, iStrip) => {
                let tempStrip = new Strip(strip.height);
                currPage.addStripToPage(tempStrip);
                let currStrip = currPage.strips[iStrip];
                strip.panels.forEach((panel, iPanel) => {
                    let tempPanel = new Panel(panel.width, panel.border);
                    currStrip.addPanelToStrip(tempPanel);
                    let currPanel = currStrip.panels[iPanel];
                    panel.elements.forEach((element) => {
                        let tempType;
                        if (element.type._name === 'Asset') {
                            tempType = new Asset(element.type._path);
                        } else {
                            tempType = new Text(
                                element.type._content,
                                element.type._fontSize,
                                element.type._fontFamily
                            );
                        }
                        let tempElement = new ElementDS(
                            element.width,
                            element.height,
                            element.alt,
                            element.src,
                            tempType
                        );
                        tempElement.pos = new Position(element.pos._x, element.pos._y);
                        currPanel.addElement(tempElement);
                    });
                });
            });
        });
        console.log(generatedComic);
        comicStore.setComic(generatedComic);
        return navigateTo('/editor');
    }

    function selectTemplate(e) {
        selectedComicConfiguration.value = e;
        draftSelected.value = false;
    }

    function selectDraftToContinue() {
        selectedComicConfiguration.value = null;
        draftSelected.value = true;
    }
</script>

<template>
    <div>
        <div class="top-nav">
            <div class="top-nav__logo">comixcraft</div>
        </div>
        <div class="container-fluid">
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
                <div class="col-lg-5 justify-content-center" style="display: flex">
                    <div class="comic-image">
                        <img src="/public/comic-image@2x.png" alt="" />
                    </div>
                </div>
            </div>
            <pre lang="json">{{ draft }}</pre>
            <div class="draft-container">
                <h2>Draft</h2>
                <p class="font-italic">Continue working on your previous draft</p>
                <div
                    class="draft-preview"
                    :class="{ 'draft-preview--selected': draftSelected }"
                    @click="selectDraftToContinue"
                >
                    <canvas class="draft-canvas"></canvas>
                    <button class="draft-btn--cancel icon" @click="deleteDraft">delete</button>
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
                            @select-template="selectTemplate"
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
                            @select-template="selectTemplate"
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
            <button class="start-btn" @click="createComic(selectedComicConfiguration?.config)" :disabled="false">
                Start Comic Crafting
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    h2 {
        color: $primary-100;
    }
    .top-nav {
        display: flex;
        align-items: center;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        margin: 0;
        padding: $spacer-3 $spacer-3;
    }

    .top-nav__logo {
        display: flex;
        flex-direction: row;
        margin-left: $spacer-3;
        justify-content: flex-start;
        justify-content: center;
        color: $white;
    }

    .intro {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: $spacer-2 $spacer-5;
    }

    .templates {
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
        max-width: 32vw !important;
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
        width: calc(100% - $spacer-6);
    }

    .start-btn:hover {
        background-color: $secondary-50;
        cursor: pointer;
    }

    .start-btn:disabled {
        background-color: $secondary-30;
        cursor: not-allowed;
    }

    .draft-container {
        position: relative;
        width: calc(100% - $spacer-3);
        height: 22vh;
        padding: $spacer-2 $spacer-5 0 $spacer-5;
        margin-bottom: $spacer-2;
    }

    .draft-preview {
        width: 90%;
        height: 80%;
        border: $border-width-lg solid $grey-100;
        border-radius: $border-radius;
        overflow: hidden;
        padding: $spacer-2 $spacer-3;
        &:hover,
        &--selected {
            cursor: pointer;
            border: $border-width-lg solid $primary;

            .template__title {
                color: $primary !important;
            }
        }
    }

    .draft-canvas {
        width: 100%;
        height: 100%;
        border: 1px solid pink;
    }

    .icon {
        padding: $spacer-1 $spacer-2;
        user-select: none;
        cursor: pointer;
        border: $border-width-lg solid $grey-60;
        border-radius: $border-radius;
    }

    .draft-btn--cancel {
        position: absolute;
        top: 0;
        right: 0;
    }

    @include media-breakpoint-up(lg) {
        .comic-image {
            max-width: 24vw !important;
        }

        .start-btn {
            width: auto;
        }

        .top-nav {
            padding: $spacer-4 $spacer-3;
        }
    }
</style>

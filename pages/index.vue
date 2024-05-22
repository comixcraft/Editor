<script setup>
    import templatePanelConfig from '/config/templatePanelConfig.js';
    import templateStripConfig from '/config/templateStripConfig.js';

    const comicStore = useComicStore();
    const draftAvailable = ref(false);

    let selectedComicConfiguration = ref(null);
    let draftSelected = ref(false);
    let deleteDraftPopUpShow = ref(false);

    function deleteDraft() {
        comicStore.deleteDraft();
        draftAvailable.value = false;
        deleteDraftPopUpShow.value = false;
        draftSelected.value = false;
        selectedComicConfiguration.value = templatePanelConfig[0];
    }

    function createComic(config) {
        draftSelected.value ? createComicFromDraft() : createNewComic(config);
    }

    function createNewComic(config) {
        if (!config) return;

        comicStore.createComicWithConfig({ ...config });
        return navigateTo('/editor');
    }

    function createComicFromDraft() {
        if (!comicStore.getDraft().value || comicStore.getDraft().value === 'null') return;

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

    onMounted(() => {
        !comicStore.getDraft().value || comicStore.getDraft().value === 'null'
            ? (draftAvailable.value = false)
            : (draftAvailable.value = true);

        if (draftAvailable.value) {
            draftSelected.value = true;
            comicStore.createComicFromDraft();
        } else {
            selectedComicConfiguration.value = templatePanelConfig[0];
        }
    });
</script>

<template>
    <div>
        <div class="top-nav">
            <img src="/public/TextwithBg.svg" alt="" class="top-nav__logo" />
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
            <div v-if="draftAvailable" class="draft-container">
                <h2>Draft</h2>
                <p class="font-italic">Continue working on your previous draft</p>
                <div
                    class="draft-preview"
                    :class="{ 'draft-preview--selected': draftSelected }"
                    @click="selectDraftToContinue"
                >
                    <PreviewCanvas :inIndex="true" />
                    <button v-if="draftSelected" class="draft-btn--cancel icon" @click="deleteDraftPopUpShow = true">
                        delete
                    </button>
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
            <button
                class="accent-btn"
                @click="createComic(selectedComicConfiguration?.config)"
                :disabled="!draftSelected && !selectedComicConfiguration"
            >
                {{ draftSelected ? 'Resume' : 'Start' }} Comic Crafting
            </button>
        </div>
        <OverlayModal :show="deleteDraftPopUpShow" :full="false" @close="deleteDraftPopUpShow = false">
            <DecisionPopUp
                imgSrc="http://localhost:3000/catalog/Characters/single/Barista%20pouring4.png?raw=true"
                title="Poof, Your hard work disappears"
                body="Are you sure you want to delete your draft? All the changes you've made will be discarded."
                :buttons="[
                    { name: 'Delete Draft', emitName: 'discard' },
                    { name: 'Keep Draft', emitName: 'cancel' },
                ]"
                @cancel="deleteDraftPopUpShow = false"
                @discard="deleteDraft"
            />
        </OverlayModal>
    </div>
</template>

<style scoped lang="scss">
    h2 {
        color: $primary-100;
    }

    .top-nav {
        justify-content: flex-start;
    }

    .top-nav__logo {
        display: flex;
        flex-direction: row;
        margin-left: $spacer-4;
        justify-content: center;
        width: 10rem;
    }

    .intro {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: $spacer-4 $spacer-5;
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

    .accent-btn {
        position: fixed;
        bottom: $spacer-6;
    }

    .draft-container {
        width: calc(100% - $spacer-3);
        height: fit-content;
        padding: $spacer-2 $spacer-5 0 $spacer-5;
        margin-bottom: $spacer-2;
        overflow: visible;
    }

    .draft-preview {
        position: relative;
        max-height: 25svh;
        border: $border-width-lg solid $grey-100;
        border-radius: $border-radius;
        display: flex;
        width: fit-content;
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
        max-width: 100%;
        max-height: 100%;
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
        z-index: 2;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, 10%);
    }

    @include media-breakpoint-up(lg) {
        .comic-image {
            max-width: 24vw !important;
        }

        .top-nav {
            justify-content: flex-start;
            padding: $spacer-4 $spacer-3;
        }
        .top-nav__logo {
            justify-content: flex-start;
        }

        .modal-container {
            display: none;
        }
    }
</style>

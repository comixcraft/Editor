<script setup>
    // Imports
    import templatePanelConfig from '/config/templatePanelConfig.js';
    import templateStripConfig from '/config/templateStripConfig.js';

    // Middlewares

    // Emits

    // Props

    // Static Variables (let, const)
    const comicStore = useComicStore();

    // Reactive Variables
    // computed

    // Reactive
    const comic = reactive(toRaw(comicStore.comic));

    // Refs
    const draftAvailable = ref(false);
    let draftSelected = ref(false);
    let deleteDraftPopUpShow = ref(false);
    let selectedComicConfiguration = ref(null);

    // Watchers

    // Methods
    function createComic(config) {
        draftSelected.value ? createComicFromDraft() : createNewComic(config);
    }

    function createComicFromDraft() {
        if (!comicStore.getDraft().value || comicStore.getDraft().value === 'null') return;

        return navigateTo('/editor');
    }

    function createNewComic(config) {
        if (!config) return;

        comicStore.createComicWithConfig({ ...config });
        return navigateTo('/editor');
    }

    function deleteDraft() {
        comicStore.deleteDraft();
        draftAvailable.value = false;
        deleteDraftPopUpShow.value = false;
        draftSelected.value = false;
        selectedComicConfiguration.value = templatePanelConfig[0];
    }

    function selectDraftToContinue() {
        selectedComicConfiguration.value = null;
        draftSelected.value = true;
    }

    function selectTemplate(e) {
        selectedComicConfiguration.value = e;
        draftSelected.value = false;
    }

    // Bus Listeners

    // Vue life cycle hooks
    onMounted(() => {
        if (comicStore.getComingBackAfterSaving()) generateToast('success', 'Comic was saved as a draft.');
        comicStore.setComingBackAfterSaving(false);

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

    // expose (defineExpose)
</script>

<template>
    <div>
        <div class="index">
            <div class="top-nav">
                <img src="/public/TextwithBg.svg" alt="" class="top-nav__logo" draggable="false" />
            </div>
            <div class="container-fluid">
                <div class="intro">
                    <!-- intro text -->
                    <div class="col-lg-5">
                        <div class="welcome-text">
                            <div class="welcome">
                                <h1>Welcome to comixcraft!</h1>
                            </div>
                            <div class="desktop-intro-text d-lg-block">
                                <p>
                                    Comics are a powerful way to bring stories to life and can even support student
                                    engagement in learning complex scientific subjects. With our user-friendly platform,
                                    anyone can become a comic creator – no artistic skills required!
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- intro image -->
                    <div class="col-lg-5 justify-content-center" style="display: flex">
                        <div class="comic-image">
                            <img src="/public/comic-image@2x.png" alt="" draggable="false" />
                        </div>
                    </div>
                </div>
                <!-- Draft -->
                <div v-if="draftAvailable" class="draft-container">
                    <h2>Draft</h2>
                    <p class="font-italic">
                        Continue working on your previous draft: <br /><strong>{{ comic.name }}</strong>
                    </p>
                    <div
                        class="draft-preview"
                        :class="{ 'draft-preview--selected': draftSelected }"
                        @click="selectDraftToContinue"
                        @dblclick="createComicFromDraft"
                        @touchstart="detectDoubleClick($event, createComicFromDraft)"
                    >
                        <PreviewCanvas :inIndex="true" />
                        <button
                            v-if="draftSelected"
                            class="draft-btn--cancel icon"
                            @click="deleteDraftPopUpShow = true"
                        >
                            delete
                        </button>
                    </div>
                </div>
                <!-- templates -->
                <div class="templates">
                    <h2>Layout</h2>
                    <p class="font-italic">
                        Choose your comic's layout. You can use a single panel or a multi-panel comic strip.
                    </p>
                    <!-- single panels -->
                    <div class="comic-sections">
                        <h3>Comic Panel</h3>
                        <p>Choose the size of your comic panel.</p>
                        <div class="comic-panels">
                            <TemplateDisplay
                                @select-template="selectTemplate"
                                v-for="option in templatePanelConfig"
                                :key="option.title"
                                :title="option.title"
                                :preview="option.preview"
                                :config="option.config"
                                :selected="option.title === selectedComicConfiguration?.title"
                                :function="createNewComic"
                            />
                        </div>
                    </div>
                    <!-- multi panels -->
                    <div class="comic-sections">
                        <h3>Comic Strip</h3>
                        <p>Choose the layout for your comic strip.</p>
                        <div class="comic-panels">
                            <TemplateDisplay
                                @select-template="selectTemplate"
                                v-for="option in templateStripConfig"
                                :key="option.title"
                                :title="option.title"
                                :preview="option.preview"
                                :config="option.config"
                                :selected="option.title === selectedComicConfiguration?.title"
                                :function="createNewComic"
                            />
                        </div>
                    </div>
                </div>
                <!-- Create comic button -->
                <button
                    class="accent-btn"
                    @click="createComic(selectedComicConfiguration?.config)"
                    :disabled="!draftSelected && !selectedComicConfiguration"
                >
                    {{ draftSelected ? 'Resume' : 'Start' }} Comic Crafting
                </button>
            </div>
            <!-- Delete Draft Modal -->
            <OverlayModal :show="deleteDraftPopUpShow" :full="false" @close="deleteDraftPopUpShow = false">
                <DecisionPopUp
                    imgSrc="./Barista_pouring4.png"
                    title="Time to delete your draft?"
                    :buttons="[
                        { name: 'Delete Draft', emitName: 'discard' },
                        { name: 'Keep Draft', emitName: 'cancel' },
                    ]"
                    @cancel="deleteDraftPopUpShow = false"
                    @discard="deleteDraft"
                >
                    <div>Are you sure you want to delete your draft?<br />This can not be undone.</div>
                </DecisionPopUp>
            </OverlayModal>
        </div>
        <FooterComponent />
    </div>
</template>

<style scoped lang="scss">
    .index {
        padding-bottom: $spacer-8;
    }

    h2 {
        color: $primary-100;
    }

    .top-nav {
        justify-content: flex-start;
    }

    .top-nav__logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 10rem;
    }

    .intro {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: $spacer-3 $spacer-2;
    }

    .templates {
        padding: $spacer-3 $spacer-2;
        user-select: none;
    }

    .welcome-text {
        display: flex;
        flex-direction: column;
        padding: $spacer-2;
        row-gap: $spacer-1;
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
        padding: $spacer-3 0;
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
        bottom: $spacer-6;
        transform: translateX(5%);
        z-index: 999;
    }

    .draft-container {
        width: calc(100% - $spacer-3);
        height: fit-content;
        padding: $spacer-3 $spacer-2;
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
        padding: $spacer-3 $spacer-4;
        &--selected {
            cursor: pointer;
            border: $border-width-lg solid $primary;

            .template__title {
                color: $primary !important;
            }
        }
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
        color: black;
    }

    @include media-breakpoint-up(lg) {
        .intro {
            padding: $spacer-4 $spacer-5;
        }
        .welcome-text {
            row-gap: $spacer-3;
        }
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

        .accent-btn {
            left: 50%;
            transform: translateX(-50%);
        }

        .draft-container {
            padding: $spacer-2 $spacer-5 0 $spacer-5;
        }

        .draft-preview {
            &:hover {
                border: $border-width-lg solid $primary;
            }
        }

        .draft-btn--cancel {
            &:hover {
                scale: 1.1;
            }
        }

        .templates {
            padding: $spacer-4 $spacer-5;
        }
    }
</style>

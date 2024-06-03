<script setup>
    // Imports

    // Middlewares
    definePageMeta({
        middleware: ['comic-defined'],
    });

    // Emits

    // Props

    // Static Variables (let, const)
    const comicStore = useComicStore();

    // Reactive Variables
    // computed

    // Reactive

    // Refs
    const previewCanvas = ref(null);
    let downloadPopUpShow = ref(false);
    let disableButton = ref(true);

    // Watchers

    // Methods
    function download() {
        const canvas = previewCanvas.value.canvasEl;
        const img = canvas.toDataURL('image/png');
        // create a link for download and click it
        const link = document.createElement('a');
        link.href = img;
        // Name of the file should come from a title of comic
        link.download = 'canvas.png';
        link.click();
        downloadPopUpShow.value = true;
    }

    function reloadApp() {
        return reloadNuxtApp({
            path: '/',
            ttl: 1000,
        });
    }

    function saveDraft() {
        let comicJson = comicStore.comic.toJSON();
        comicStore.saveDraft(comicJson);

        downloadPopUpShow.value = false;

        return reloadNuxtApp({
            path: '/',
            ttl: 1000,
        });
    }

    // useHead({
    //     link: [
    //         {
    //             rel: 'preload',
    //             as: 'image',
    //             href: './RatsInLove.png',
    //             type: 'image/png',
    //         },
    //     ],
    // });

    // Bus Listeners

    // Vue life cycle hooks
    onMounted(() => {
        window.onbeforeunload = function (e) {
            if (e.target.activeElement === this.document.body) {
                e.preventDefault();
            }
        };
    });

    onBeforeUnmount(() => {
        window.onbeforeunload = null;
    });

    // defineExpose
</script>

<template>
    <div class="share">
        <div class="share__top-nav top-nav">
            <button class="icon-btn">
                <NuxtLink to="/editor" class="icon-btn icon"> arrow_back </NuxtLink>
            </button>
            <div class="share__top-nav-item download-txt">Download Comic</div>
        </div>
        <div class="share-container">
            <div class="share__body">
                <div class="export__details d-none">
                    <div class="share__input-group">
                        <label class="share__input-group-label" for="project-name">Project Name:</label>
                        <input
                            class="share__input-group-input"
                            type="text"
                            id="project-name"
                            placeholder="Enter project name"
                        />
                    </div>
                    <div class="share__input-group">
                        <label class="share__input-group-label" for="file-type">File Type:</label>
                        <select class="share__input-group-select" id="file.type">
                            <option value="png">PNG</option>
                        </select>
                    </div>
                    <div class="share__input-group">
                        <label class="share__input-group-label" for="select-panels">Select Panels:</label>
                        <select class="share__input-group-select" id="select-panels">
                            <option value="1">All panels</option>
                        </select>
                    </div>
                </div>

                <PreviewCanvas ref="previewCanvas" @disable-button="(e) => (disableButton = e.disableButton)" />
                <div class="btn-container">
                    <button class="accent-btn" @click="download" :disabled="disableButton">Download Comic</button>
                    <button class="accent-btn btn-last" @click="saveDraft">Save Draft</button>
                </div>
            </div>
        </div>
        <OverlayModal :show="downloadPopUpShow" :full="false" @close="downloadPopUpShow = false">
            <DecisionPopUp
                imgSrc="/RatsInLove.png"
                title="Download successful!"
                body="Congratulations! Your comic has been downloaded. It's time to share it with the world."
                :buttons="[
                    { name: 'Create New Comic', emitName: 'discard' },
                    { name: 'Save Draft', emitName: 'save' },
                ]"
                @save="saveDraft"
                @discard="reloadApp"
            />
        </OverlayModal>
        <FooterComponent />
    </div>
</template>

<style scoped lang="scss">
    .share {
        padding-bottom: $spacer-8;
        width: 100%;
        height: 100svh;
    }

    .share__body {
        padding: $spacer-3;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .share-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .export__details {
        flex: 1;
        padding-bottom: $spacer-3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .icon-btn {
        color: white;
        text-decoration: none;
        &:hover {
            scale: 1.2;
        }
    }

    .export__details {
        flex: 1;
        padding-bottom: $spacer-3;
    }

    .share__input-group {
        margin-bottom: $spacer-4;
    }

    .share__input-group-label {
        display: block;
        margin-bottom: $spacer-1;
    }

    .share__top-nav {
        width: 100%;
        user-select: none;
    }

    .share__input-group-input,
    .share__input-group-select {
        padding: $spacer-2 $spacer-6 $spacer-2 $spacer-2;
        border: $border-width solid $grey-60;
        border-radius: $border-radius;
    }

    .share__preview {
        margin-top: $spacer-5;
    }

    .btn-container {
        z-index: 1;
        width: calc(100% - $spacer-6);
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $spacer-3;
        margin-bottom: $spacer-6;
        padding-bottom: $spacer-4;
    }

    .accent-btn {
        transform: none;
        min-width: 20%;
    }

    .btn-last {
        color: $secondary-100;
        background-color: $white-100;
        border: $border-width solid $secondary-100;
        &:hover {
            background-color: $secondary-50;
            color: $white;
        }
    }

    .share__confirm-btn {
        flex-grow: 1;
        text-align: center;
        background-color: $secondary-100;
        color: $grey-0;
        padding: $spacer-3 $spacer-5;
        border-radius: $border-radius-lg;
        border: none;
    }

    .share__confirm-btn:hover {
        background-color: $secondary-50;
        cursor: pointer;
    }

    .share__top-nav-item {
        padding: $spacer-3;
        $font-size-phone: 3;
        color: $white;
        text-decoration: none;
    }

    .preview__container {
        flex: 1;
        display: flex;
        justify-content: center;
    }

    .preview__canvas {
        border: $border-width solid black;
        border-radius: $border-radius;
        max-width: 22rem;
    }

    @include media-breakpoint-up(lg) {
        .share__body {
            flex-direction: column;
        }

        .btn-container {
            flex-direction: row;
            justify-content: center;
        }
    }
</style>

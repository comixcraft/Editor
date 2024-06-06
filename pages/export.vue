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
    const comic = reactive(toRaw(comicStore.comic));

    // Reactive Variables
    // computed

    // Reactive

    // Refs
    const previewCanvas = ref(null);
    const comicName = ref('');
    let downloadPopUpShow = ref(false);
    let saveDraftPopUpShow = ref(false);
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
        link.download = (comicName.value.value || 'canvas') + '.png';
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

        reloadApp();
    }

    function saveDraftPopUpCheck() {
        if (comicStore.getDraft().value !== null) {
            saveDraftPopUpShow.value = true;
        } else {
            saveDraft();
        }
    }

    async function share() {
        const canvas = previewCanvas.value.canvasEl;
        // share the comic
        try {
            const response = await fetch(canvas.toDataURL('image/png'));
            const blob = await response.blob();
            const fileName = (comicName.value.value || 'canvas') + '.png';
            if (navigator.share) {
                const filesArray = [
                    new File([blob], fileName, { type: 'image/png', lastModified: new Date().getTime() }),
                ];
                const shareData = {
                    files: filesArray,
                };

                navigator.share(shareData).then(() => {
                    console.log('Shared successfully');
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const blobUrl = URL.createObjectURL(blob);
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                URL.revokeObjectURL(blobUrl); // Cleanup
                alert('Image copied to clipboard');
            }
        } catch (error) {
            alert("Oh no! Your Browser doesn't support sharing images");
        }
    }

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
            <div class="export__details">
                <div class="share__input-group">
                    <label class="share__input-group-label" for="project-name">Project Name</label>
                    <input
                        ref="comicName"
                        class="share__input-group-input"
                        type="text"
                        id="project-name"
                        placeholder="Enter project name"
                        v-model="comic.name"
                    />
                </div>
                <div class="share__input-group d-none">
                    <label class="share__input-group-label" for="file-type">File Type:</label>
                    <select class="share__input-group-select" id="file.type">
                        <option value="png">PNG</option>
                    </select>
                </div>
                <div class="share__input-group d-none">
                    <label class="share__input-group-label" for="select-panels">Select Panels:</label>
                    <select class="share__input-group-select" id="select-panels">
                        <option value="1">All panels</option>
                    </select>
                </div>
            </div>

            <PreviewCanvas
                class="mt-3"
                ref="previewCanvas"
                @disable-button="(e) => (disableButton = e.disableButton)"
            />
            <div class="btn-container mt-3">
                <button class="accent-btn" @click="download" :disabled="disableButton">Download as PNG</button>
                <button class="accent-btn btn-last" @click="share" :disabled="disableButton">Share</button>
                <button class="accent-btn btn-last" @click="saveDraftPopUpCheck()">Save Draft</button>
            </div>
        </div>
        <OverlayModal :show="downloadPopUpShow" :full="false" @close="downloadPopUpShow = false">
            <DecisionPopUp
                imgSrc="/RatsInLove.png"
                title="Download successful!"
                :buttons="[{ name: 'Create New Comic', emitName: 'discard' }]"
                @discard="reloadApp"
            >
                <div>Your comic has been downloaded.<br />Creating a new comic will overwrite your current one.</div>
            </DecisionPopUp>
        </OverlayModal>
        <OverlayModal :show="saveDraftPopUpShow" :full="false" @close="saveDraftPopUpShow = false">
            <DecisionPopUp
                imgSrc="/Barista Exclaiming4.png"
                title="You can only have one draft."
                :buttons="[
                    { name: 'Save Draft', emitName: 'save' },
                    { name: 'Cancel', emitName: 'cancel' },
                ]"
                @cancel="saveDraftPopUpShow = false"
                @save="saveDraft"
            >
                <div>Saving a new one overwrites the existing one.</div>
            </DecisionPopUp>
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

    .share-container {
        padding: $spacer-3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
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

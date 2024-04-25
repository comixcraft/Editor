<template>
    <div class="share">
        <div class="share__top-nav">
            <NuxtLink to="/editor" class="share__top-nav-item back-btn icon" @click="$emit('back')">
                arrow_back
            </NuxtLink>
            <div class="share__top-nav-item download-txt">Download Comic</div>
        </div>
        <div class="share__body">
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
                <select class="file-type-select">
                    <option value="png">PNG</option>
                </select>
            </div>
            <div class="share__input-group">
                <label class="share__input-group-label" for="select-panels">Select Panels:</label>
                <select class="file-type-select">
                    <option value="1">All panels</option>
                </select>
            </div>
            <div ref="previewCanvas" class="preview__container">
                <h3>Preview:</h3>
                <canvas ref="canvasEl" class="preview__canvas"></canvas>
            </div>
        </div>
        <div class="share__confirm">
            <button class="share__confirm-btn" @click="download">download</button>
        </div>
    </div>
</template>

<script setup>
    defineEmits(['back']);

    definePageMeta({
        middleware: ['comic-defined'],
    });

    const comicStore = useComicStore();

    const canvasWidth = ref(0);
    const canvasHeight = ref(0);
    const canvasEl = ref(null);
    let activePanel = ref(null);

    async function displayPreview() {
        const canvas = canvasEl.value;
        // set the size of the canvas, should come from the wrapper, should be defined when choosing a template
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;

        let context = canvas.getContext('2d');

        // draw a white background
        context.beginPath();
        context.fillStyle = 'white';
        context.rect(0, 0, canvasWidth.value, canvasHeight.value);
        context.fill();
        context.restore();

        // draw each element on the canvas
        activePanel.value.elements.forEach((element, key) => {
            const currentState = element.currentState();
            const pos = currentState.pos.currPos();
            const img = new Image();
            img.onload = () => {
                if (currentState.isMirrored) {
                    context.scale(-1, 1);
                    context.translate(-currentState.width - pos.x, pos.y);
                    context.drawImage(img, 0, 0, currentState.width, currentState.height);
                    context.resetTransform();
                } else {
                    context.drawImage(img, pos.x, pos.y, currentState.width, currentState.height);
                }
            };
            // to change once the images are right
            img.src = currentState.src;
        });

        // draw credit logo at the bottom left
        const credit = {
            src: '/tempCredit.png',
            width: 180,
            height: 40,
        };
        const creditLogo = new Image();
        creditLogo.src = credit.src;
        creditLogo.onload = () => {
            context.drawImage(creditLogo, 0, canvas.height - credit.height, credit.width, credit.height);
        };
    }

    // not working with the github asset due to CORS problem
    function download() {
        const canvas = canvasEl.value;
        const img = canvas.toDataURL('image/png');
        // create a link for download and click it
        const link = document.createElement('a');
        link.href = img;
        // Name of the file should come from a title of comic
        link.download = 'canvas.png';
        link.click();
    }

    activePanel.value = comicStore.comic.getPage(0).getStrip(0).getPanel(0);
    canvasWidth.value = activePanel.value.width;
    canvasHeight.value = comicStore.comic.getPage(0).getStrip(0).height;

    onMounted(() => {
        displayPreview();
    });
</script>

<style scoped lang="scss">
    .share__top-nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        height: 80px;
        margin: 0;
        color: white;
    }

    .share__body {
        padding: $spacer-3;
    }

    .share__input-group {
        margin-bottom: $spacer-4;
    }

    .share__input-group-label {
        display: block;
        margin-bottom: 5px;
    }

    .share__input-group-input,
    .share__input-group-select {
        padding: $spacer-2;
        padding-right: $spacer-6;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .share__preview {
        margin-top: $spacer-5;
    }

    .share__confirm {
        position: absolute;
        bottom: 10%;
        right: 7%;
        padding: $spacer-3;
        z-index: 999;
    }

    .share__confirm-btn {
        position: absolute;
        bottom: 10%;
        right: 7%;
        padding: $spacer-3;
        background-color: #f460b7;
        z-index: 9999;
    }

    .share__top-nav-item {
        padding: $spacer-3;
        $font-size-phone: 3;
        color: #eee;
        text-decoration: none;
    }

    .preview__container {
        z-index: 1000;
        justify-self: center;
        align-self: center;
        background-color: white;
        justify-items: center;
        align-items: center;
    }

    .preview__canvas {
        border: 1px solid black;
        background-color: white;
        box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.75);
        width: 100%;
        height: auto;
    }
    @include media-breakpoint-up(m) {
        .preview__canvas {
            border: 1px solid black;
            width: auto;
            height: 100%;
        }
        .preview__container {
            height: 25vh;
            width: 25vw;
        }
    }
</style>

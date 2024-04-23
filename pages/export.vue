<template>
    <div ref="previewCanvas" class="preview__container">
        <button>
            <NuxtLink to="/editor">Back</NuxtLink>
        </button>
        <p>Preview</p>
        <canvas ref="canvasEl" class="preview__canvas"></canvas>
        <button @click="download">download</button>
    </div>
</template>

<script setup>
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
            const type = currentState.type.name;
            switch (type) {
                case 'Asset':
                    drawAsset(context, currentState, pos);
                    break;
                case 'Text':
                    drawText(context, currentState, pos);
                    break;
                default:
                    console.log('Element type not recognized');
            }
        });
    }

    function drawAsset(context, currentState, pos) {
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
        img.src = currentState.src;
    }

    function getLines(context, text, maxWidth) {
        let words = text.split(' ');
        let lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            let word = words[i];
            let width = context.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    function drawText(context, currentState, pos) {
        context.font = `${currentState.type.fontSize}px ${currentState.type.fontFamily}`;
        context.fillStyle = 'black';
        context.textBaseline = 'top';
        getLines(context, currentState.type.content, currentState.width).forEach((line, i) => {
            context.fillText(line, pos.x, pos.y + i * currentState.type.fontSize);
        });
    }

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

<style>
    .preview__container {
        z-index: 1000;
        justify-self: center;
        align-self: center;
        width: 75vw;
        height: 85vh;
        position: absolute;
        top: 7.5vh;
        left: 12.5vw;
        background-color: white;
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        padding: 0.25rem;
        gap: 0.25rem;
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

    p {
        margin: 0;
    }

    @media (min-width: 768px) {
        .preview__canvas {
            border: 1px solid black;
            width: auto;
            height: 100%;
        }
    }
</style>

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

        drawCredit(canvas, context);
    }

    function drawAsset(context, currentState, pos) {
        const img = new Image();
        img.onload = () => {
            // Save the current context
            context.save();

            // Move the rotation point to the center of the image
            context.translate(pos.x + currentState.width / 2, pos.y + currentState.height / 2);

            // Rotate the canvas to the specified degrees
            context.rotate((currentState.rotation * Math.PI) / 180);

            // Mirror the canvas around the x-axis or y-axis if necessary
            if (currentState.isMirroredHorizontal) {
                context.scale(-1, 1);
            }
            if (currentState.isMirroredVertical) {
                context.scale(1, -1);
            }

            // Draw the image
            context.drawImage(
                img,
                -currentState.width / 2,
                -currentState.height / 2,
                currentState.width,
                currentState.height
            );

            // Restore the saved context
            context.restore();
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
        // Save the current context
        context.save();
        context.font = `${currentState.type.fontSize}px ${currentState.type.fontFamily}`;
        context.fillStyle = 'black';
        context.textBaseline = 'top';

        // Move the rotation point to the center of the element
        context.translate(pos.x + currentState.width / 2, pos.y + currentState.height / 2);

        // Rotate the canvas to the specified degrees
        context.rotate((currentState.rotation * Math.PI) / 180);

        // Mirror the canvas around the x-axis or y-axis if necessary
        if (currentState.isMirroredHorizontal) {
            context.scale(-1, 1);
        }
        if (currentState.isMirroredVertical) {
            context.scale(1, -1);
        }

        // Move the rotation point back to the top-left corner of the element so that the text is drawn correctly
        context.translate(-currentState.width / 2, -currentState.height / 2);

        getLines(context, currentState.type.content, currentState.width).forEach((line, i) => {
            context.fillText(line, 0, i * currentState.type.fontSize);
        });

        // Restore the saved context
        context.restore();
    }

    function drawCredit(canvas, context) {
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

<template>
    <div class="share">
        <div class="share__top-nav">
            <NuxtLink to="/editor" class="share__top-nav-item back-btn icon"> arrow_back </NuxtLink>
            <div class="share__top-nav-item download-txt">Download Comic</div>
        </div>
        <div class="share__body">
            <div class="export__details">
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
                    <select class="share__input-group-select">
                        <option value="png">PNG</option>
                    </select>
                </div>
                <div class="share__input-group">
                    <label class="share__input-group-label" for="select-panels">Select Panels:</label>
                    <select class="share__input-group-select">
                        <option value="1">All panels</option>
                    </select>
                </div>
            </div>

            <div ref="previewCanvas" class="preview__container">
                <canvas ref="canvasEl" class="preview__canvas"></canvas>
            </div>
        </div>
        <button class="share__confirm-btn" @click="download">Download</button>
    </div>
</template>

<style scoped lang="scss">
    .share__top-nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        padding: $spacer-1 $spacer-3;
        margin: 0;
        color: $white;
    }

    .share__body {
        padding: $spacer-3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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

    .share__input-group-input,
    .share__input-group-select {
        padding: $spacer-2 $spacer-6 $spacer-2 $spacer-2;
        border: $border-width solid $grey-60;
        border-radius: $border-radius;
    }

    .share__preview {
        margin-top: $spacer-5;
    }

    .share__confirm-btn {
        position: fixed;
        text-align: center;
        z-index: 1;
        background-color: $secondary-100;
        color: $grey-0;
        padding: $spacer-3 $spacer-5;
        border-radius: $border-radius-lg;
        border: none;
        bottom: $spacer-6;
        width: calc(100% - $spacer-6);
        left: 50%;
        transform: translateX(-50%);
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
        width: auto;
        height: 100%;
    }

    @include media-breakpoint-up(lg) {
        .share__confirm-btn {
            width: auto;
        }

        .share__body {
            flex-direction: row;
        }
    }
</style>

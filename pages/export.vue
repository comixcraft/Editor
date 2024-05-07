<script setup>
    definePageMeta({
        middleware: ['comic-defined'],
    });

    const comicStore = useComicStore();

    const canvasEl = ref(null);
    const gap = 10;
    const creditSize = { w: 180, h: 40 };

    async function displayPreview() {
        const canvas = canvasEl.value;
        canvas.width = gap;
        canvas.height = gap + comicStore.comic.getPage(0).getStrip(0).height + creditSize.h;
        // set the size of the canvas, should come from the wrapper, should be defined when choosing a template
        const stripsHeight = comicStore.comic.getPage(0).getStrip(0).height;
        const panels = comicStore.comic.getPage(0).getStrip(0).panels;

        // set the width of the canvas according to the width of the panels
        for (let i = 0; i < panels.length; i++) {
            canvas.width += panels[i].width + gap;
        }

        let context = canvas.getContext('2d');

        // draw a white background
        context.save();
        context.beginPath();
        context.fillStyle = 'white';
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.restore();

        // draw the panels
        let startPoint = gap;
        for (let i = 0; i < panels.length; i++) {
            drawPanel(context, panels[i], startPoint, stripsHeight);
            startPoint += panels[i].width + gap;
        }

        // draw the credit logo
        drawCredit(canvas, context);
    }

    function drawAsset(context, element, panelDimension) {
        const img = new Image();
        img.src = element.type.path;
        // Save the current context
        context.save();

        // Move the rotation point to the center of the image
        context.translate(
            element.pos.x * panelDimension.width + (element.width * panelDimension.width) / 2,
            element.pos.y * panelDimension.height + (element.height * panelDimension.height) / 2
        );

        // Rotate the canvas to the specified degrees
        context.rotate((element.rotation * Math.PI) / 180);

        // Mirror the canvas around the x-axis or y-axis if necessary
        if (element.isMirroredHorizontal) {
            context.scale(-1, 1);
        }
        if (element.isMirroredVertical) {
            context.scale(1, -1);
        }

        // Draw the image
        context.drawImage(
            img,
            (-element.width * panelDimension.width) / 2,
            (-element.height * panelDimension.height) / 2,
            element.width * panelDimension.width,
            element.height * panelDimension.height
        );

        // Restore the saved context
        context.restore();
    }

    function getLines(context, text, maxWidth) {
        let words = text.split(' ');
        let lines = [];
        let currentLine = words[0];

        // Loop through each word and add it to the current line if it fits
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

    function drawText(context, element, panelDimension) {
        // Save the current context
        context.save();

        // Set the font properties
        context.font = `${element.type.fontSize}px ${element.type.fontFamily}`;
        context.fillStyle = 'black';
        context.textBaseline = 'top';

        // Move the rotation point to the center of the element
        context.translate(
            element.pos.x * panelDimension.width + (element.width * panelDimension.width) / 2,
            element.pos.y * panelDimension.height + (element.height * panelDimension.height) / 2
        );

        // Rotate the canvas to the specified degrees
        context.rotate((element.rotation * Math.PI) / 180);

        // Mirror the canvas around the x-axis or y-axis if necessary
        if (element.isMirroredHorizontal) {
            context.scale(-1, 1);
        }
        if (element.isMirroredVertical) {
            context.scale(1, -1);
        }

        // Move the rotation point back to the top-left corner of the element so that the text is drawn correctly
        context.translate((-element.width * panelDimension.width) / 2, (-element.height * panelDimension.height) / 2);

        // Draw the text once the lines are created
        getLines(context, element.type.content, element.width * panelDimension.width).forEach((line, i) => {
            context.fillText(line, 0, i * element.type.fontSize);
        });

        // Restore the saved context
        context.restore();
    }

    function drawCredit(canvas, context) {
        // draw credit logo at the bottom left
        const credit = {
            src: '/tempCredit.png',
            width: creditSize.w,
            height: creditSize.h,
        };
        const creditLogo = new Image();
        creditLogo.src = credit.src;
        creditLogo.onload = () => {
            context.drawImage(creditLogo, gap, canvas.height - credit.height, credit.width, credit.height);
        };
    }

    function drawPanel(context, panel, startPoint, height) {
        // create a canvas to prerender the panel
        const newCanvas = document.createElement('canvas');
        newCanvas.width = panel.width;
        newCanvas.height = height;
        const newContext = newCanvas.getContext('2d');

        // draw the panels
        panel.elements.forEach((element, key) => {
            if (element.type.name === 'Asset') {
                drawAsset(newContext, element, { width: panel.width, height });
            } else if (element.type.name === 'Text') {
                drawText(newContext, element, { width: panel.width, height });
            } else {
                console.log('Element not recognized in drawPanel in export.vue.');
            }
        });

        // draw the border of the panel
        const img = new Image();
        img.src = panel.border;
        newContext.drawImage(img, 0, 0, panel.width, height);

        // draw the panel on the preview canvas
        context.drawImage(newCanvas, startPoint, gap);
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

    function saveDraft() {
        let comicJson = comicStore.comic.toJSON();
        comicStore.saveDraft(comicJson);
    }

    onMounted(() => {
        displayPreview();
    });
</script>

<template>
    <div class="share">
        <div class="share__top-nav top-nav-lg">
            <NuxtLink to="/editor" class="share__top-nav-item back-btn icon"> arrow_back </NuxtLink>
            <div class="share__top-nav-item download-txt">Download Comic</div>
        </div>
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
        <div class="btn-container">
            <!-- <button class="accent-btn" @click="saveDraft">Save Draft</button> -->
            <button class="accent-btn" @click="download">Download</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .share__body {
        padding: $spacer-3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .export__details {
        flex: 1;
        padding-bottom: $spacer-3;
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

    .btn-container {
        z-index: 1;
        width: calc(100% - $spacer-6);
        position: fixed;
        left: 50%;
        bottom: calc(0% + $spacer-6);
        transform: translateX(-50%);
        display: flex;
        gap: $spacer-3;
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

    .accent-btn {
        position: fixed;
        bottom: $spacer-6;
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
            flex-direction: row;
        }
    }
</style>

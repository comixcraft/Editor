<script setup>
    definePageMeta({
        middleware: ['comic-defined'],
    });

    const comicStore = useComicStore();

    const canvasWidth = ref(0);
    const canvasHeight = ref(0);
    const canvasEl = ref(null);
    let activePanel = ref(null);
    let panelHeight;
    const gap = 10;
    const creditSize = { w: 180, h: 40 };

    async function displayPreview() {
        const canvas = canvasEl.value;
        canvasWidth.value = gap;
        panelHeight = comicStore.comic.getPage(0).getStrip(0).height;
        canvasHeight.value = gap + comicStore.comic.getPage(0).getStrip(0).height + creditSize.h;
        // set the size of the canvas, should come from the wrapper, should be defined when choosing a template
        const stripsHeight = comicStore.comic.getPage(0).getStrip(0).height;
        const panels = comicStore.comic.getPage(0).getStrip(0).panels;

        for (let i = 0; i < panels.length; i++) {
            canvasWidth.value += panels[i].width + gap;
        }

        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;

        let context = canvas.getContext('2d');

        // draw a white background
        context.beginPath();
        context.fillStyle = 'white';
        context.rect(0, 0, canvasWidth.value, canvasHeight.value);
        context.fill();
        context.restore();

        let startPos = gap;
        // draw the panels
        for (let i = 0; i < panels.length; i++) {
            drawPanel(context, panels[i], startPos, stripsHeight);
            startPos += panels[i].width + gap;
        }

        drawCredit(canvas, context);
    }

    function drawAsset(context, startPos, element, panel) {
        console.log(panelHeight);
        const img = new Image();
        img.onload = () => {
            // Save the current context
            context.save();
            context.translate(startPos, gap);

            // element outside left of the canvas
            if (element.pos.x < 0) {
                element.sStartX = (-element.pos.x * element.type.naturalWidth) / element.width;
                element.sWidth = ((element.width + element.pos.x) * element.type.naturalWidth) / element.width;
                element.dX = 0;
                element.dWidth = element.width + element.pos.x;
            }
            // element outside right of the canvas
            else if (element.pos.x + element.width > panel.width) {
                element.sStartX = 0;
                element.sWidth =
                    ((element.width - (element.pos.x + element.width - panel.width)) * element.type.naturalWidth) /
                    element.width;
                element.dX = element.pos.x;
                element.dWidth = panel.width - element.pos.x;
            } else {
                element.sStartX = 0;
                element.sWidth = (element.width * element.type.naturalWidth) / element.width;
                element.dX = element.pos.x;
                element.dWidth = element.width;
            }

            // element outside top of the canvas
            if (element.pos.y < 0) {
                element.sStartY = (-element.pos.y * element.type.naturalHeight) / element.height;
                element.sHeight = ((element.height + element.pos.y) * element.type.naturalHeight) / element.height;
                element.dY = 0;
                element.dHeight = element.height + element.pos.y;
            }
            // element outside bottom of the canvas
            else if (element.pos.y + element.height > panelHeight) {
                element.sStartY = 0;
                element.sHeight =
                    ((element.height - (element.pos.y + element.height - panelHeight)) * element.type.naturalHeight) /
                    element.height;
                element.dY = element.pos.y;
                element.dHeight = panelHeight - element.pos.y;
            } else {
                element.sStartY = 0;
                element.sHeight = element.type.naturalHeight;
                element.dY = element.pos.y;
                element.dHeight = element.height;
            }

            // Move the rotation point to the center of the image
            // context.translate(element.pos.x + element.width / 2, element.pos.y + element.height / 2);

            // Rotate the canvas to the specified degrees
            // context.rotate((element.rotation * Math.PI) / 180);

            // context.translate(element.dX, element.dY);

            // Mirror the canvas around the x-axis or y-axis if necessary
            if (element.isMirroredHorizontal) {
                context.scale(-1, 1);
            }
            if (element.isMirroredVertical) {
                context.scale(1, -1);
            }

            context.translate(element.dX, element.dY);

            // Draw the image
            context.drawImage(
                img,
                element.sStartX, // src x
                element.sStartY, // src y
                element.sWidth, // src width
                element.sHeight, // src height
                0, // dest x
                0, // dest y
                element.dWidth, // dest width
                element.dHeight // dest height
            );

            // Restore the saved context
            context.restore();
        };
        img.src = element.src;
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

    function drawText(context, startPos, element, panelWidth) {
        // Save the current context
        context.save();
        context.translate(startPos, gap);

        context.font = `${element.type.fontSize}px ${element.type.fontFamily}`;
        context.fillStyle = 'black';
        context.textBaseline = 'top';

        // Move the rotation point to the center of the element
        context.translate(element.pos.x + element.width / 2, element.pos.y + element.height / 2);

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
        context.translate(-element.width / 2, -element.height / 2);

        getLines(context, element.type.content, element.width).forEach((line, i) => {
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

    function drawPanel(context, panel, startPos, height) {
        panel.elements.forEach((element, key) => {
            switch (element.type.name) {
                case 'Asset':
                    drawAsset(context, startPos, element, panel);
                    break;
                case 'Text':
                    drawText(context, startPos, element, panel.width);
                    break;
                default:
                    console.log('Element type not recognized');
            }
        });
        const img = new Image();
        img.src = panel.border;
        img.onload = () => {
            // Save the current context
            context.save();
            context.translate(startPos, gap);

            // Draw the image
            context.drawImage(img, 0, 0, panel.width, height);
            context.restore();
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
            <!--
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
        -->
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

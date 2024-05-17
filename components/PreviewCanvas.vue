<script setup>
    import bowser from 'bowser';

    // Imports

    // Middlewares

    // Emits
    const emit = defineEmits(['disableButton']);

    // Props
    const props = defineProps({
        inIndex: {
            type: Boolean,
            default: false,
        },
    });

    // Static Variables (let, const)
    const comicStore = useComicStore();
    const gap = 10;
    const creditSize = { w: 180, h: 40 };
    const promiseArray = [];
    let browser;
    // Reactive Variables
    // computed

    // Reactive

    // Refs
    const canvasEl = ref(null);

    // Watchers

    // Methods
    function initiateCanvas() {
        const stripsHeight = comicStore.comic.getPage(0).getStrip(0).height;
        const panels = comicStore.comic.getPage(0).getStrip(0).panels;
        const canvas = canvasEl.value;
        canvas.width = gap;
        canvas.height = gap + stripsHeight + creditSize.h;

        // set the width of the canvas according to the width of the panels
        for (let i = 0; i < panels.length; i++) {
            canvas.width += panels[i].width + gap;
        }

        let context = canvas.getContext('2d');
        return [context, canvas, panels, stripsHeight];
    }

    async function displayPreview() {
        let [context, canvas, panels, stripsHeight] = initiateCanvas();

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
            drawPanel(context, panels[i], startPoint, stripsHeight, i);
            startPoint += panels[i].width + gap;
        }

        // draw the credit logo
        drawCredit(canvas, context);
        Promise.all(promiseArray).then(() => {
            emit('disableButton', { disableButton: false });
        });
    }

    function displayPlaceholder() {
        let [context, canvas, panels] = initiateCanvas();
        context.save();
        context.beginPath();
        context.fillStyle = 'white';
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.restore();
        context.save();
        let img = new Image();
        img.src = '/draft-placeholder.png';
        img.onload = function () {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        // context.font = '180px Arial';
        // context.rotate(0.25 * Math.PI);
        // context.fillText('Your Draft', 250, 200);
        context.restore();
        emit('disableButton', { disableButton: false });
    }

    function drawAsset(context, element, panelDimension) {
        const img = new Image();
        let promiseAsset = new Promise((resolve) => {
            img.onload = resolve;
            img.src = element.type.path;
        });
        promiseArray.push(promiseAsset);
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

    async function drawCredit(canvas, context) {
        // draw credit logo at the bottom left
        const credit = {
            src: '/tempCredit.png',
            width: creditSize.w,
            height: creditSize.h,
        };
        const creditLogo = new Image();
        let creditPromise = new Promise((resolve) => {
            creditLogo.onload = resolve;
            creditLogo.src = credit.src;
        });
        promiseArray.push(creditPromise);
        context.drawImage(creditLogo, gap, canvas.height - credit.height, credit.width, credit.height);
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
        let borderPromise = new Promise((resolve) => {
            img.onload = resolve;
            img.src = panel.border;
        });
        promiseArray.push(borderPromise);
        newContext.drawImage(img, 0, 0, panel.width, height);

        // draw the panel on the preview canvas
        context.drawImage(newCanvas, startPoint, gap);
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

    // Bus Listeners

    // Vue life cycle hooks
    browser = bowser.getParser(navigator.userAgent);
    onMounted(() => {
        if (
            (browser.getBrowserName() == 'Safari' || browser.getOSName() == 'iOS' || browser.getOSName() == 'macOS') &&
            props.inIndex
        ) {
            displayPlaceholder();
            return;
        }

        displayPreview();
        // Needed to get rendered on index.vue.
        if (props.inIndex) {
            setTimeout(() => {
                displayPreview();
            }, 1000);
        }
    });

    // define expose
    defineExpose({
        canvasEl,
    });
</script>

<template>
    <div ref="previewCanvas" class="preview__container">
        <canvas ref="canvasEl" :class="inIndex ? 'preview__canvas--inIndex' : ''" class="preview__canvas"></canvas>
    </div>
</template>

<style scoped lang="scss">
    /* SCSS */
    .preview__container {
        flex: 1;
        display: flex;
        justify-content: center;
        padding: $spacer-3 $spacer-4;
    }

    .preview__canvas {
        border: $border-width solid black;
        border-radius: $border-radius;
        width: auto;
        max-height: 70svh;
        max-width: 100%;
        height: auto;
        &--inIndex {
            max-height: 250px;
        }
    }
</style>

<script setup>
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

    // Reactive Variables
    // computed

    // Reactive

    // Refs
    const canvasEl = ref(null);
    const load = ref(true);

    // Watchers

    // Methods
    async function displayPreview() {
        const stripsHeight = comicStore.comic.getPage(0).getStrip(0).height;
        const panels = comicStore.comic.getPage(0).getStrip(0).panels;
        const canvas = canvasEl.value;
        canvas.width = gap;
        canvas.height = gap + stripsHeight + (props.inIndex ? creditSize.h : 0);

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
            let pan = drawPanel(context, panels[i], startPoint, stripsHeight, i);
            startPoint += panels[i].width + gap;
            promiseArray.push(pan);
        }

        if (!props.inIndex) {
            let pr = drawCredit(canvas, context);
            promiseArray.push(pr);
        }

        // draw the credit logo
        // drawCredit(canvas, context);
        Promise.all(promiseArray).then((values) => {
            load.value = false;
            emit('disableButton', { disableButton: false });
        });
    }

    function drawAsset(context, element, panelDimension) {
        return new Promise((res, rej) => {
            const img = new Image();
            new Promise((resolve) => {
                img.onload = resolve;
                img.src = element.type.path;
            }).then(() => {
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
                res('asset drawn');
            });
        });
    }

    function drawCredit(canvas, context) {
        return new Promise((res, reject) => {
            // draw credit logo at the bottom left
            const credit = {
                src: '/tempCredit.png',
                width: creditSize.w,
                height: creditSize.h,
            };
            const creditLogo = new Image();
            new Promise((resolve) => {
                creditLogo.onload = resolve;
                creditLogo.src = credit.src;
            }).then(() => {
                context.drawImage(creditLogo, gap, canvas.height - credit.height, credit.width, credit.height);
                res('credit drawn');
            });
        });
    }

    function drawPanel(context, panel, startPoint, height, index) {
        let elementsPromises = [];
        return new Promise((res, rej) => {
            // create a canvas to prerender the panel
            const newCanvas = document.createElement('canvas');
            newCanvas.width = panel.width;
            newCanvas.height = height;
            const newContext = newCanvas.getContext('2d');

            // draw the panels
            panel.elements.forEach((element, key) => {
                if (element.type.name === 'Asset') {
                    let assetPromise = drawAsset(newContext, element, { width: panel.width, height });
                    elementsPromises.push(assetPromise);
                } else if (element.type.name === 'Text') {
                    let textPromise = drawText(newContext, element, { width: panel.width, height });
                    elementsPromises.push(textPromise);
                } else {
                    console.log('Element not recognized in drawPanel in export.vue.');
                }
            });

            Promise.all(elementsPromises).then(() => {
                // draw the border of the panel
                const img = new Image();
                new Promise((resolve) => {
                    img.onload = resolve;
                    img.src = panel.border;
                }).then(() => {
                    newContext.drawImage(img, 0, 0, panel.width, height);
                    // draw the panel on the preview canvas
                    context.drawImage(newCanvas, startPoint, gap);
                    res('panel drawn');
                });
            });
        });
    }

    function drawText(context, element, panelDimension) {
        return new Promise((resolveText) => {
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
            context.translate(
                (-element.width * panelDimension.width) / 2,
                (-element.height * panelDimension.height) / 2
            );

            // Draw the text once the lines are created
            new Promise((resolveLine) => {
                getLines(context, element.type.content, element.width * panelDimension.width).forEach((line, i) => {
                    context.fillText(line, 0, i * element.type.fontSize);
                });
                context.restore();
                resolveLine('line drawn');
                resolveText('text drawn');
            });
        });
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
    onMounted(() => {
        displayPreview();
    });

    // define expose
    defineExpose({
        canvasEl,
    });
</script>

<template>
    <div ref="previewCanvas" class="preview__container">
        <div class="loader" v-if="load"></div>
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

        .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50px;
            aspect-ratio: 1;
            border-radius: 50%;
            background:
                radial-gradient(farthest-side, $secondary-100 94%, #0000) top/8px 8px no-repeat,
                conic-gradient(#0000 30%, $secondary-100);
            -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
            animation: l13 1s infinite linear;
        }
    }

    .preview__canvas {
        width: auto;
        max-height: 70svh;
        max-width: 100%;
        height: auto;
        &--inIndex {
            max-height: 250px;
        }
    }

    @keyframes l13 {
        0% {
            transform: translate(-50%, -50%);
        }
        100% {
            transform: translate(-50%, -50%) rotate(1turn);
        }
    }
</style>

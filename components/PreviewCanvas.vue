<script setup type="module">
    // Imports
    import SpinnerLoader from './SpinnerLoader.vue';

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
    const creditSize = { w: 400, h: 50 };
    const ccSize = { w: 80, h: 40 };
    const gap = 10;
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
        canvas.height = gap + stripsHeight + (props.inIndex ? 0 : creditSize.h);

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

        // draw the credit logo if the preview is not in the index
        if (!props.inIndex) {
            let pr = drawCredit(canvas, context);
            promiseArray.push(pr);
        }

        // Wait for all the promises to resolve before enabling the button
        Promise.all(promiseArray).then((values) => {
            load.value = false;
            emit('disableButton', { disableButton: false });
        });
    }

    function drawAsset(context, element, panelDimension) {
        return new Promise((resolveAsset) => {
            const img = new Image();
            // load the image and draw it on the canvas
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
                resolveAsset('asset drawn');
            });
        });
    }

    function drawCredit(canvas, context) {
        return new Promise((resolve, reject) => {
            // draw credit logo at the bottom left
            const credit = {
                src: '/logoCredit.png',
                width: creditSize.w,
                height: creditSize.h,
            };
            const ccbysa = {
                src: '/CCbysa.png',
                width: ccSize.w,
                height: ccSize.h,
            };
            const creditLogo = new Image();
            const ccbysaLogo = new Image();

            // load both logos and draw them on the canvas
            Promise.all([
                new Promise((resolve) => {
                    creditLogo.onload = resolve;
                    creditLogo.src = credit.src;
                }),
                new Promise((resolve) => {
                    ccbysaLogo.onload = resolve;
                    ccbysaLogo.src = ccbysa.src;
                }),
            ]).then(() => {
                // Draw the credit logo on the left side
                context.drawImage(creditLogo, gap, canvas.height - credit.height, credit.width, credit.height);

                // Draw the cc by sa logo on the right side
                const ccbysaX = canvas.width - ccbysa.width - gap;
                context.drawImage(ccbysaLogo, ccbysaX, canvas.height - ccbysa.height, ccbysa.width, ccbysa.height);

                resolve('credit drawn');
            });
        });
    }

    function drawPanel(context, panel, startPoint, height, index) {
        return new Promise(async (res, rej) => {
            // create a canvas to prerender the panel
            const newCanvas = document.createElement('canvas');
            newCanvas.width = panel.width;
            newCanvas.height = height;
            const newContext = newCanvas.getContext('2d');

            // get z sorted array of elements
            let arrayZ = Array.from(panel.elements, ([key, value]) => value)
                .slice()
                .sort((a, b) => a.z - b.z);

            // draw the elements on the panel
            for (const element of arrayZ) {
                if (element.type.name === 'Asset') {
                    await drawAsset(newContext, element, { width: panel.width, height });
                } else if (element.type.name === 'Text') {
                    await drawText(newContext, element, { width: panel.width, height });
                } else {
                    console.log('Element not recognized in drawPanel in export.vue.');
                }
            }
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
    }

    function drawText(context, element, panelDimension) {
        return new Promise((resolveText) => {
            // Save the current context
            context.save();

            let fontSize = element.type.fontSize * panelDimension.width;
            // Set the font properties
            context.font = `${fontSize}px ${element.type.fontFamily}`;
            context.fillStyle = 'black';
            context.textBaseline = 'top';

            // Move the rotation point to the center of the element
            context.translate(
                element.pos.x * panelDimension.width + (element.width * panelDimension.width) / 2,
                element.pos.y * panelDimension.height + (element.height * panelDimension.height) / 2 + fontSize / 10
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
                    context.fillText(line, 0, i * fontSize);
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
        let currentLine = '';

        // Loop through each word and add it to the current line if it fits
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let width = context.measureText(currentLine + word).width;
            if (word.includes('-') && width > maxWidth) {
                const splitWord = word.split('-');
                currentLine += splitWord[0] + '-';
                lines.push(currentLine);
                currentLine = splitWord[1] + ' ';
            } else if (width < maxWidth || i === 0) {
                currentLine += word + ' ';
            } else {
                lines.push(currentLine);
                currentLine = word + ' ';
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
    <div ref="previewCanvas" :class="{ 'preview--inIndex': inIndex }" class="preview">
        <div v-if="load" class="preview__loader">
            <SpinnerLoader></SpinnerLoader>
        </div>
        <canvas ref="canvasEl" class="preview__canvas"></canvas>
    </div>
</template>

<style scoped lang="scss">
    /* SCSS */
    .preview {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 $spacer-5;

        &--inIndex {
            .preview__canvas {
                max-height: 250px;
                border: none;
                height: 100%;
            }
        }

        &__canvas {
            max-height: 70svh;
            max-width: 100%;
            object-fit: contain;
            border: $border-width solid $grey-100;
        }

        &__loader {
            position: absolute;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>

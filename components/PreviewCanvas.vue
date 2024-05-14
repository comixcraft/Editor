<script setup>
    // Imports

    // Middlewares

    // Emits

    // Props

    // Static Variables (let, const)
    const comicStore = useComicStore();
    const gap = 10;
    const creditSize = { w: 180, h: 40 };

    // Reactive Variables
    // computed

    // Reactive

    // Refs
    const canvasEl = ref(null);

    // Watchers

    // Methods
    async function displayPreview() {
        const canvas = canvasEl.value;
        canvas.width = gap;
        canvas.height = gap + comicStore.comic.getPage(0).getStrip(0).height + creditSize.h;
        // set the size of the canvas, should come from the wrapper, should be defined when choosing a template
        const stripsHeight = comicStore.comic.getPage(0).getStrip(0).height;
        const panels = comicStore.comic.getPage(0).getStrip(0).panels;
        console.log('called', panels);

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
            await drawPanel(context, panels[i], startPoint, stripsHeight);
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

    async function drawPanel(context, panel, startPoint, height) {
        console.log('drawPanel called', panel);
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
        <canvas ref="canvasEl" class="preview__canvas"></canvas>
    </div>
</template>

<style scoped lang="scss">
    /* SCSS */
    .preview__container {
        flex: 1;
        display: flex;
        justify-content: center;
        max-width: 100%;
    }

    .preview__canvas {
        border: $border-width solid black;
        border-radius: $border-radius;
        max-width: 22rem;
    }
</style>

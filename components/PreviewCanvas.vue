<script setup>

const props = defineProps({
    size: Object
})


function closePreview() {
    document.querySelector(".previewContainer").classList.add("hide");
}

async function  displayPreview() {
    const canvas = document.querySelector('.previewCanvas');
    // set the size of the canvas, should come from the wrapper, should be defined when choosing a template
    canvas.width = props.size.w;
    canvas.height = props.size.h;

    let context = canvas.getContext('2d');

    // draw each element on the canvas
    elementsInCanvas.value.forEach((element, key) => {
        const currentState = element.currentState();
        const pos = currentState.pos.currPos();
        const img = new Image();
        img.onload = () => {
            console.log(currentState)
            if (currentState.isMirrored) {
                context.scale(-1,1)
                context.translate(-currentState.width -pos.x, pos.y);
                context.drawImage(img, 0, 0, currentState.width, currentState.height);
                context.restore();
            }
            else {
                context.drawImage(img, pos.x, pos.y, currentState.width, currentState.height)
            }
        }
        // to change once the images are right
        img.src = '/Barista And Coffee no expression.png';
    })
}

// not working with the github asset due to CORS problem
function download() {
    const canvas = document.querySelector('.previewCanvas');
    const img = canvas.toDataURL('image/png');
    // create a link for download and click it
    const link = document.createElement('a');
    link.href = img;
    link.download = 'canvas.png';
    link.click();
}

defineExpose({ displayPreview })
</script>

<template>
    <div class="previewContainer hide" ref="previewCanvas">
        <button class="closeBtn" @click="closePreview">X</button>
        <p>Preview</p>
        <canvas class="previewCanvas" ref="canvas"> </canvas>
        <button @click="download">download</button>
    </div>
</template>

<style>
.previewContainer {
    z-index: 1000;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.75);
    justify-self: center;
    align-self: center;
    width: 75vw;
    height: 85vh;
    position: absolute;
    top: 7.5vh;
    left: 12.5vw;
    background-color: white;
    display: grid;
    grid-template-rows: auto 1fr auto;
    padding: .25rem;
    gap: .25rem;
    justify-items: center;
    align-items: center;
}

.hide {
    display: none;
}

.previewCanvas {
    border: 1px solid black;
    width: 100%;
    height: auto;
}

.closeBtn {
    border-radius: 50%;
    background-color: red;
    width: 1.25rem;
    height: 1.25rem;
    border: none;
    position: absolute;
    padding: .1rem;
    top: .25rem;
    right: .25rem;
    color: white;
}

p {
    margin: 0;
}

@media (min-width: 768px) {
    .previewCanvas {
        border: 1px solid black;
        width: auto;
        height: 100%;
    }
}
</style>
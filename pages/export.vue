<template>
    <div class="previewContainer" ref="previewCanvas">
        <button>
            <NuxtLink to="/">Back</NuxtLink>
        </button>
        <p>Preview</p>
        <canvas class="previewCanvas" ref="canvasEl"> </canvas>
        <button @click="download">download</button>
    </div>
</template>

<script setup>
const canvasWidth = ref(0);
const canvasHeight = ref(0);
const canvasEl = ref(null);

async function displayPreview() {
    const canvas = canvasEl.value;
    // set the size of the canvas, should come from the wrapper, should be defined when choosing a template
    canvas.width = canvasWidth.value;
    canvas.height = canvasHeight.value;

    let context = canvas.getContext('2d');

    // draw a white background
    context.beginPath();
    context.fillStyle = "white";
    context.rect(0,0,canvasWidth.value, canvasHeight.value);
    context.fill()
    context.restore();

    // draw each element on the canvas
    elementsInCanvas.value.forEach((element, key) => {
        const currentState = element.currentState();
        const pos = currentState.pos.currPos();
        const img = new Image();
        img.onload = () => {
            if (currentState.isMirrored) {
                context.scale(-1, 1)
                context.translate(-currentState.width - pos.x, pos.y);
                context.drawImage(img, 0, 0, currentState.width, currentState.height);
                context.restore();
            }
            else {
                context.drawImage(img, pos.x, pos.y, currentState.width, currentState.height)
                context.restore();
            }
        }
        // to change once the images are right
        img.src = currentState.src;
    })
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

onMounted(() => {
    const route = useRoute();

    canvasWidth.value = route.query.width ? route.query.width : 0;
    canvasHeight.value = route.query.height ? route.query.height : 0;

    displayPreview();
    
})

</script>

<style>

.previewContainer {
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
    padding: .25rem;
    gap: .25rem;
    justify-items: center;
    align-items: center;
}

.previewCanvas {
    border: 1px solid black;
    
    background-color: white;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.75);
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
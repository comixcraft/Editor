<script setup>
import {onMounted, watch} from 'vue';
function closePreview() {
    document.querySelector(".previewContainer").classList.add("hide");
}

function displayPreview() {
    const canvas = document.querySelector('.previewCanvas');
    canvas.width = 300;
    canvas.height = 500;

    let context = canvas.getContext('2d');
    // Drawing a circle
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 70;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(0,200,0, .7)';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();


    elementsInCanvas.value.forEach((element, key) => {
        console.log(element.currentState())
    })

}

function download() {
    const canvas = document.querySelector('.previewCanvas');
    const dataURL = canvas.toDataURL("image/png");

    // Create an link and click it to download the png
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'test.png';
    a.click();
}

watch(elementsCounter, () => {displayPreview()});
onMounted(() => displayPreview());

</script>

<template>
    <div class="previewContainer hide">
        <button class="closeBtn" @click="closePreview">X</button>
        <p>Preview</p>
        <canvas class="previewCanvas"> </canvas>
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
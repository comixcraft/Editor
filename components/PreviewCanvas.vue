<script setup>
function closePreview() {
    document.querySelector(".previewContainer").classList.add("hide");
}
</script>

<template>
    <div class="previewContainer hide">
        <button class="closeBtn" @click="closePreview">X</button>
        <p>Preview</p>
        <canvas class="previewCanvas"></canvas>
        <button>download</button>

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

.previewCanvas {
    border: 1px solid black;
    width: 100%;
    height: 100%;
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

p{
    margin: 0;
}
</style>
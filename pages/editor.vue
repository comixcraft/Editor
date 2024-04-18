<template>
    <div class="editor">
        <div class="editor__top-nav">
            <div class="top-nav__item back-btn icon" @click="$emit('back')">arrow_back</div>
            <div class="top-nav__item undo-btn icon" @click="$emit('undo')">undo</div>
            <div class="top-nav__item redo-btn icon" @click="$emit('redo')">redo</div>
            <div class="top-nav__item preview-btn"><button @click="previewShow = true">preview</button></div>
            <div class="top-nav__item layer-btn"><button @click="layersShow = true">layers</button></div>
            <div class="top-nav__item export-btn icon" @click="$emit('export')">download</div>
        </div>
        <div class="editor__canvas">
            <div class="canvas__placeholder"></div>
            <div class="centered-grey-div"></div>
        </div>
        <div class="swipingArea">
            <div class="swipingTriggers"></div>
            <div class="swipingTriggers"></div>
        </div>
        <div class="editor__bottom-nav">
            <div class="bottom-nav__scrollable-nav">
                <div class="scrollable-nav__item characters-btn">Characters</div>
                <div class="scrollable-nav__item speech-bubble-btn">Speech Bubble</div>
                <div class="scrollable-nav__item text-btn">Text</div>
                <div class="scrollable-nav__item shapes-btn">Shapes</div>
                <div class="scrollable-nav__item scenes-btn">Scenes</div>
            </div>
        </div>
        <ScreenOverlay title="Layers" :show="layersShow" @close="layersShow = false">
            <div class="layerBackground">
                <div class="layerContainer">
                    <div class="layer">
                        <div class="assetImage"></div>
                        <p class="layerText">layer 1</p>
                        <div class="chevrons">
                            <div class="expandLess icon" @click="$emit('expandLess')">expand_less</div>
                            <div class="expandMore icon" @click="$emit('expandMore')">expand_more</div>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenOverlay>
        <ScreenOverlay title="Preview" :show="previewShow" @close="previewShow = false">
            <div class="darkenBackground">
                <div class="comicPreview"></div>
            </div>
        </ScreenOverlay>
    </div>
</template>

<style scoped lang="scss"></style>

<script setup>
    let layersShow = ref(false);
    let previewShow = ref(false);
    defineEmits(['back', 'undo', 'redo', 'preview', 'layers', 'export', 'expandLess', 'expandMore']);
</script>

<style scoped lang="scss">
    .editor__top-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        height: 80px;
        margin: 0;
    }
    .editor__canvas {
        height: 80vh;
    }

    .centered-grey-div {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ccc;
        width: 85%;
        height: 70%;
    }

    .editor__bottom-nav {
        background-color: $grey-90;
        padding: $spacer-3;
    }

    .bottom-nav__scrollable-nav {
        display: flex;
        overflow-x: auto;
    }

    .scrollable-nav__item {
        padding: 8px 16px;
        margin-right: 10px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        border-radius: 4px;
        background-color: #fff;
    }

    .scrollable-nav__item:hover {
        background-color: #e0e0e0;
    }

    .swipingArea {
        width: 100vw;
        display: flex;
        justify-content: center;
        gap: 5px;
    }

    .swipingTriggers {
        width: 10px;
        height: 10px;
        background-color: pink;
        border-radius: 50%;
        display: inline-block;
        margin-bottom: 10px;
    }

    .darkenBackground {
        width: 100vw;
        height: 100vh;
        background-color: black;
        opacity: 60%;
    }

    .comicPreview {
        width: 300px;
        height: 200px;
        background-color: #ccc;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .layerBackground {
        width: 100vw;
        height: 100vh;
        background-color: white;
    }

    .layerContainer {
        display: flex;
        justify-content: center;
        align-items: center; /* Center items vertically */
    }

    .layer {
        padding: $spacer-3;
        width: 90%;
        background-color: #ccc;
        margin-top: $spacer-4;
        display: flex; /* To make items within .layer align in a row */
        align-items: center; /* Center items vertically */
    }

    .assetImage {
        width: 60px;
        height: 60px;
        background-color: white;
        margin-right: 10px; /* Adjust margin between images as needed */
    }

    .layerContent {
        display: flex;
        align-items: center;
    }

    .chevrons {
        display: flex;
        flex-direction: column;
        margin-left: auto; /* Push chevrons to the right */
    }

    .layerText {
        margin: 0; /* Remove default margin from paragraph */
    }
</style>

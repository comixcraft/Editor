<template>
    <div class="editor">
        <div class="editor__top-nav">
            <div class="top-nav__item back-btn icon">arrow_back</div>
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
        <div class="swiping-area">
            <div class="swiping-indicator desktop">1</div>
            <div class="swiping-indicator desktop">2</div>
            <div class="swiping-triggers mobile"></div>
            <div class="swiping-triggers mobile"></div>
        </div>
        <div class="bottom-nav__container">
            <div class="editor__bottom-nav">
                <div class="bottom-nav__scrollable-nav">
                    <div class="scrollable-nav__item characters-btn">Characters</div>
                    <div class="scrollable-nav__item speech-bubble-btn">Speech Bubble</div>
                    <div class="scrollable-nav__item text-btn">Text</div>
                    <div class="scrollable-nav__item shapes-btn">Shapes</div>
                    <div class="scrollable-nav__item scenes-btn">Scenes</div>
                </div>
            </div>
            <div class="placeholder-rectangle"></div>
        </div>
        <ScreenOverlay title="Layers" :show="layersShow" @close="layersShow = false">
            <div class="layer-background">
                <div class="layer-container">
                    <div class="layer">
                        <div class="asset-image"></div>
                        <p class="layer-text">layer 1</p>
                        <div class="chevrons">
                            <div class="expand-less icon" @click="$emit('expandLess')">expand_less</div>
                            <div class="expand-more icon" @click="$emit('expandMore')">expand_more</div>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenOverlay>
        <ScreenOverlay title="Preview" :show="previewShow" @close="previewShow = false">
            <div class="darken-background">
                <div class="comic-preview"></div>
            </div>
        </ScreenOverlay>
    </div>
</template>

<style scoped lang="scss"></style>

<script setup>
    let layersShow = ref(false);
    let previewShow = ref(false);
    let popUpShow = ref(false);
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
        align-items: center;
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

    .swiping-area {
        display: flex;
        justify-content: center;
        margin-top: 20px; /* Adjust as needed */
    }

    .swiping-indicator {
        width: 30px; /* Adjust as needed */
        height: 30px; /* Adjust as needed */
        background-color: #ccc; /* Adjust as needed */
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px; /* Adjust as needed */
        border-radius: 5px; /* Adjust as needed */
    }

    .swiping-triggers {
        width: 10px;
        height: 10px;
        background-color: pink;
        border-radius: 50%;
        display: inline-block;
        margin-bottom: 10px;
    }

    .darken-background {
        width: 100vw;
        height: 100vh;
        background-color: black;
        opacity: 60%;
    }

    .comic-preview {
        width: 60vw;
        height: 20vh;
        background-color: #ccc;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .layer-background {
        width: 100vw;
        height: 100vh;
        background-color: white;
    }

    .layer-container {
        display: flex;
        justify-content: center;
        align-items: center; /* Center items vertically */
    }

    .layer {
        padding: $spacer-3;
        width: 90vw;
        background-color: #ccc;
        margin-top: $spacer-4;
        display: flex; /* To make items within .layer align in a row */
        align-items: center; /* Center items vertically */
    }

    .asset-image {
        width: 60px;
        height: 60px;
        background-color: white;
        margin-right: 10px; /* Adjust margin between images as needed */
    }

    .layer-content {
        display: flex;
        align-items: center;
    }

    .chevrons {
        display: flex;
        flex-direction: column;
        margin-left: auto; /* Push chevrons to the right */
    }

    .layer-text {
        margin: 0; /* Remove default margin from paragraph */
    }

    .bottom-nav__container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #fff; // Set background color as needed
        z-index: 1000; // Ensure it's above other content
    }

    @media (min-width: 992px) {
        .editor__top-nav {
            z-index: 999999;
        }
        .editor__bottom-nav {
            height: 100vh;
        }
        .mobile {
            display: none; /* Hide small circles for desktop screens */
        }
        .centered-grey-div {
            background-color: #ccc;
            width: 50vw;
            height: 50vh;
            display: flex;
            justify-content: right;
        }
        .editor__canvas {
            align-items: center;
            display: flex;
            justify-content: right;
            padding: $spacer-4;
        }
        .bottom-nav__container {
            position: absolute;
            top: 80px; /* Adjust as needed to place it below the top navigation */
            left: 0;
            width: 200px; /* Adjust the width as needed */
            background-color: #fff; /* Set background color as needed */
            z-index: 1000; /* Ensure it's above other content */
        }

        .bottom-nav__scrollable-nav {
            display: flex;
            flex-direction: column;
            padding: 20px;
            gap: 10px;
        }
        .bottom-nav__scrollable-nav {
            display: flex;
            overflow-y: auto;
        }

        .placeholder-rectangle {
            width: 25vw; // Adjust width to match side navigation width
            height: calc(100vh - 80px); // Adjust height to match available viewport height
            background-color: #ccc; // Set background color as needed
            position: fixed;
            top: 80px; // Adjust as needed to account for top navigation height
            left: 200px; // Position it to the right of the side navigation
            z-index: 900; // Ensure it's behind side navigation
        }
    }

    @media (max-width: 991px) {
        .placeholder-rectangle {
            display: none;
        }
        .desktop {
            display: none;
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
    }
</style>

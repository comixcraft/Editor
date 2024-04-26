<template>
    <div class="layer">
        <div class="asset-image"></div>
        <p class="layer-text">layer 1</p>
        <div class="chevrons">
            <div class="expand-less icon">expand_less</div>
            <div class="expand-more icon">expand_more</div>
        </div>
    </div>
    <ScreenOverlay title="Layers" :show="layersShow">
        <div class="layer-background">
            <div class="layer-container"></div>
        </div>
    </ScreenOverlay>
</template>
<script setup></script>

<style scoped lang="scss">
    .layer {
        padding: $spacer-3;
        width: 90vw;
        background-color: #ccc;
        margin-top: $spacer-4;
        display: flex;
        align-items: center;
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
        margin-left: auto;
    }

    .layer-text {
        margin: 0;
    }
</style>

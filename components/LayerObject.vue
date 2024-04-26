<template>
    <div class="layer">
        <div class="asset-image"></div>
        <p class="layer-text">Layer 1</p>
        <div class="chevrons">
            <button class="expand-less icon icon-btn">expand_less</button>
            <button class="expand-more icon icon-btn">expand_more</button>
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
        border: $primary 1px solid;
        border-radius: $border-radius;
        margin-top: $spacer-4;
        display: flex;
        align-items: center;
    }

    .asset-image {
        width: 60px;
        height: 60px;
        background-color: $primary-30;
        margin-right: 10px;
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

    .icon-btn {
        border: none;
        height: 40px;
        width: 40px;
        text-align: center;
        border-radius: $border-radius;
        vertical-align: middle;
        background-color: transparent;
        color: $grey-80;
    }
</style>

<script setup>

    defineProps({
    altText: String,
    url: String,
    })


</script>

<template>

  <div class="icon-container">
    <div class="icon" id="up-arrow"></div>
    <div class="icon" id="down-arrow"></div>
    <div class="icon" id="flip" @click="$emit('mirrorEvent')"></div>
  </div>

</template>

<style scoped>

    .icon-container {
        --grid-column-gap: 10px;
        --grid-padding-h: 3px;
        --grid-padding-v: 10px;

        position: absolute;
        padding: var(--grid-padding-h) var(--grid-padding-v);
        top: -60px;
        left: 50%;
        transform: translate(-50%, 0);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: var(--grid-column-gap);
        background-color: aliceblue;
        border: 2px solid black;
        border-radius: 5px;
    }

    .icon {
        --icon-height: 32px;

        width: var(--icon-height);
        height: var(--icon-height);
        border: 1px solid rgba(0,0,0,0.5);
        border-radius: 5px;
        right: -20px;   
    }

    #up-arrow {
        background: no-repeat center/80%  url('/assets/upArrow.svg'), white;
    }

    #down-arrow {
        background: no-repeat center/80%  url('/assets/downArrow.svg'), white;
    }

    #flip {
        background: no-repeat center/80%  url('/assets/flip.svg'), white;
    }

</style>
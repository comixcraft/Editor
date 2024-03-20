<script setup>

    defineProps({
        w: Number,
        h: Number,
        altText: String,
        url: String,
    })

    let elementActive = false;

</script>

<template>
        <DraggableResizable 
        :x="150"
        :y="150"
        :w="w" 
        :h="h" 
        :parent="true" 
        :class-name-active="'elementActive'" 
        @activated="function() {elementActive = !elementActive}"
        @deactivated="function() {elementActive = !elementActive}">
            <img :src="url" :alt="altText">
            <img v-if="elementActive" src="/assets/bin.svg" alt="bin icon" class="icon" id="bin">
            <img v-if="elementActive" src="/assets/bin.svg" alt="bin icon" class="icon" id="up-arrow">
            <img v-if="elementActive" src="/assets/bin.svg" alt="bin icon" class="icon" id="dow-arrow">
        </DraggableResizable>
</template>

<style scoped>

    img {
        width: 100%;
        height: 100%;
    }

    .elementActive {
        border: 1px dashed red;
    }

    .icon {
        position: absolute;
        width: 32px;
        height: 32px;
        background-color: white;
        border: 2px solid red;
        border-radius: 5px;
        right: -16px;   
    }

    #bin {
        top: 10px;
        background: no-repeat center/80%  url('/assets/bin.svg');
    }

    #up-arrow {
        top: 52px;
        background: no-repeat center/80%  url('/assets/');
    }

    #down-arrow {
        top: 94px;
        background: no-repeat center/80%  url('/assets/down-arrow.svg');
    }

</style>
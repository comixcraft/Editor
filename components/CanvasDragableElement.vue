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
            <img v-if="elementActive" src="/assets/bin.svg" alt="bin icon" id="deleteIcon">
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

    #deleteIcon {
        content: "";
        position: absolute;
        top: 10px;
        right: -16px;    
        width: 32px;
        height: 32px;
        background-color: white;
        background: no-repeat center/80%  url('/assets/bin.svg');
        border: 2px solid red;
        border-radius: 5px;
    }

</style>
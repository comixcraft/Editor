<script setup>

    defineProps({
        w: Number,
        h: Number,
        altText: String,
        url: String,
    })

    let elementActive = false;
    let deleteElement = ref(false);

</script>

<template>
        <DraggableResizable 
        :x="150"
        :y="150"
        :w="w" 
        :h="h" 
        :parent="true" 
        :class-name-active="'elementActive'" 
        v-if="!deleteElement"
        @activated="function() {elementActive = !elementActive}"
        @deactivated="function() {elementActive = !elementActive}">
            <img :src="url" :alt="altText">
            <div v-if="elementActive" class="icon" id="bin" @click="function() {deleteElement = !deleteElement}"></div>
            <div v-if="elementActive" class="icon" id="up-arrow"></div>
            <div v-if="elementActive" class="icon" id="down-arrow"></div>
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
        border: 2px solid red;
        border-radius: 5px;
        right: -16px;   
    }

    #bin {
        top: 10px;
        background: no-repeat center/80%  url('/assets/bin.svg'), white;
    }

    #up-arrow {
        top: 52px;
        background: no-repeat center/80%  url('/assets/upArrow.svg'), white;
        border-color: black;
    }

    #down-arrow {
        top: 94px;
        background: no-repeat center/80%  url('/assets/downArrow.svg'), white;
        border-color: black;
    }

</style>
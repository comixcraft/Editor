<script setup>
    function deleteElement(elId) {
        // all z element
        changeZIndex(elId);
        // delete last element of map
        elementsInCanvas.delete(elementsInCanvas.size);
    }

    function changeZIndex(z) {
        // change all z index
        if (z > elementsInCanvas.size - 1) return; // stop recursive call when reaching second to last element (last one will be deleted)

        let nextElement = elementsInCanvas.get(z + 1);

        nextElement.setZIndex(z); // change z-index of next element
        elementsInCanvas.set(z, nextElement); // update map element with next element
        z++; // increment z index
        changeZIndex(z); // recursive
    }
</script>

<template>
    <div ref="container" class="wrapper">
        <CanvasDraggableElement
            v-for="[key, value] in elementsInCanvas"
            :key="key"
            :altText="value.currentState().name"
            :eId="value.currentState().id"
            :h="value.currentState().height"
            :isMirrored="value.currentState().isMirrored"
            :pos="value.currentState().pos"
            :url="value.currentState().src"
            :w="value.currentState().width"
            :z="value.currentState().z"
            @delete-event="deleteElement"
        />
    </div>
</template>

<style>
    @import 'vue-draggable-resizable/style.css';

    .wrapper {
        /* TODO: should be defined dynamically once the value comes from template */
        width: 450px;
        height: 750px;

        border: 1px solid #000;
        overflow: hidden;
        display: grid;
    }
</style>

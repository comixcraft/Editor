<script setup>
    const props = defineProps({
        panel: Object,
    });

    let elements = props.panel.currentState().elements;

    function deleteElement(elId) {
        // all z element
        changeZIndex(elId);
        // delete last element of map
        props.panel.deleteElement(elements.size);
    }

    function updatePosition(obj) {
        // check what map entry correspond to id
        let matchingIdEntry;
        elements.forEach((value, key) => {
            if (value.currentState().id === obj.id) matchingIdEntry = value;
        });
        if (!matchingIdEntry) {
            console.log('Error in id passing for updatePosition function [CanvasDraggableElement:20]');
            return;
        }
        // update position of element
        matchingIdEntry.setPos({ x: obj.self.value.left, y: obj.self.value.top });
    }

    function changeZIndex(z) {
        // change all z index
        if (z > elements.size - 1) return; // stop recursive call when reaching second to last element (last one will be deleted)

        let nextElement = elements.get(z + 1);

        nextElement.setZIndex(z); // change z-index of next element
        elements.set(z, nextElement); // update map element with next element
        z++; // increment z index
        changeZIndex(z); // recursive
    }
</script>

<template>
    <div ref="container" class="wrapper">
        <CanvasDraggableElement
            v-for="[key, value] in elements"
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
            @update-event="updatePosition"
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

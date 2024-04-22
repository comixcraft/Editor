<script setup>
    const props = defineProps({
        panel: Object,
    });

    let elements = props.panel.currentState().elements;

    function deleteElement(elId) {
        // delete last element of map
        props.panel.deleteElement(elId);
    }

    function resizeElement(obj) {
        if (!elements.has(obj.id)) {
            console.log('Error in passing the element id');
            return;
        }
        props.panel.getElement(obj.id).setPos({ x: obj.pos.x, y: obj.pos.y });
        props.panel.getElement(obj.id).setWidth(obj.width);
        props.panel.getElement(obj.id).setHeight(obj.height);
    }

    function updatePosition(obj) {
        if (!elements.has(obj.id)) {
            console.log('Error in passing the element id');
            return;
        }
        props.panel.getElement(obj.id).setPos({ x: obj.pos.x, y: obj.pos.y });
    }

    function mirrorElement(obj) {
        if (!elements.has(obj.id)) {
            console.log('Error in passing the element id');
            return;
        }
        props.panel.getElement(obj.id).setIsMirrored(obj.mirror);
    }

    function upElement(eId) {
        props.panel.moveZIndexUp(eId);
    }

    function downElement(eId) {
        props.panel.moveZIndexDown(eId);
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
            @resize-event="resizeElement"
            @mirror-event="mirrorElement"
            @front-event="upElement"
            @back-event="downElement"
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

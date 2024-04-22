<script setup>
    const props = defineProps({
        height: Number,
        panel: Object,
    });

    const canvasHeight = computed(() => props.height + 'px');
    const canvasWidth = computed(() => props.panel.currentState().width + 'px');

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
        elements.get(obj.id).setPos({ x: obj.pos.x, y: obj.pos.y });
        elements.get(obj.id).setWidth(obj.width);
        elements.get(obj.id).setHeight(obj.height);
    }

    function updatePosition(obj) {
        if (!elements.has(obj.id)) {
            console.log('Error in passing the element id');
            return;
        }
        elements.get(obj.id).setPos({ x: obj.pos.x, y: obj.pos.y });
    }

    function mirrorElement(obj) {
        if (!elements.has(obj.id)) {
            console.log('Error in passing the element id');
            return;
        }
        elements.get(obj.id).setIsMirrored(obj.mirror);
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
        />
    </div>
</template>

<style>
    @import 'vue-draggable-resizable/style.css';

    .wrapper {
        width: v-bind(canvasWidth);
        height: v-bind(canvasHeight);

        border: 1px solid #000;
        overflow: hidden;
        display: grid;
    }
</style>

<script setup>
    const props = defineProps({
        height: Number,
        panel: Object,
    });

    const canvasHeight = computed(() => props.height + 'px');
    const canvasWidth = computed(() => props.panel.currentState().width + 'px');

    let elements = props.panel.elements;
    const border = props.panel.border;

    function deleteElement(eId) {
        // delete last element of map
        props.panel.deleteElement(eId);
    }

    function resizeElement(obj) {
        if (!elements.has(obj.eId)) {
            console.log('Error in passing the element id');
            return;
        }
        elements.get(obj.eId).setPos({ x: obj.pos.x, y: obj.pos.y });
        elements.get(obj.eId).setWidth(obj.width);
        elements.get(obj.eId).setHeight(obj.height);
    }

    function updatePosition(obj) {
        if (!elements.has(obj.eId)) {
            console.log('Error in passing the element id');
            return;
        }
        elements.get(obj.eId).setPos({ x: obj.pos.x, y: obj.pos.y });
    }

    function updateMirrorValues(obj) {
        if (!elements.has(obj.eId)) {
            console.log('Error in passing the element id');
            return;
        }

        if (obj.direction === 'x') {
            elements.get(obj.eId).setIsMirroredHorizontal(obj.isMirrored);
            return;
        }
        elements.get(obj.eId).setIsMirroredVertical(obj.isMirrored);
    }

    function updateRotation(obj) {
        if (!elements.has(obj.eId)) {
            console.log('Error in passing the element id');
            return;
        }

        elements.get(obj.eId).setRotation(obj.rotation);
    }
</script>

<template>
    <div>
        <div ref="container" class="panel container">
            <DragResizeRotate
                v-for="[key, value] in elements"
                :key="key"
                :altText="value.currentState().name"
                :eId="value.currentState().id"
                :h="value.currentState().height"
                :isMirroredHorizontal="value.currentState().isMirroredHorizontal"
                :isMirroredVertical="value.currentState().isMirroredVertical"
                :rotation="value.currentState().rotation"
                :pos="value.currentState().pos"
                :url="value.currentState().src"
                :w="value.currentState().width"
                :z="value.currentState().z"
                @delete-event="deleteElement"
                @update-event="updatePosition"
                @resize-event="resizeElement"
                @mirror-horizontal-event="updateMirrorValues"
                @mirror-vertical-event="updateMirrorValues"
                @rotate-event="updateRotation"
            />
            <img :src="border" class="panel__border" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .panel {
        width: v-bind(canvasWidth);
        height: v-bind(canvasHeight);
        position: relative;

        &__border {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            user-select: none;
        }
    }
</style>

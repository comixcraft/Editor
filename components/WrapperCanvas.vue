<script setup>
    const props = defineProps({
        height: Number,
        panel: Object,
        comic: Object, // testing purpose
        selectedId: String,
        lockAspectRatio: Boolean,
    });

    const comicStore = useComicStore();
    const canvasHeight = computed(() => props.height + 'px');
    const canvasWidth = computed(() => props.panel.currentState().width + 'px');
    const border = props.panel.border;
    let elements = props.panel.elements;

    function validateElementId(eId) {
        if (!elements.has(eId)) {
            return;
        }
    }

    function deleteElement(eId) {
        // delete last element of map
        props.panel.deleteElement(eId);
    }

    function resizeElement(obj) {
        // validate element id
        validateElementId(obj.eId);
        // update element width and height
        elements.get(obj.eId).setPos({ x: obj.pos.x, y: obj.pos.y });
        elements.get(obj.eId).setWidth(obj.width);
        elements.get(obj.eId).setHeight(obj.height);
    }

    function updatePosition(obj) {
        // validate element id
        validateElementId(obj.eId);
        // update element position
        elements.get(obj.eId).setPos({ x: obj.pos.x, y: obj.pos.y });
    }

    function updateMirrorValues(obj) {
        // validate element id
        validateElementId(obj.eId);

        // update element mirror values
        if (obj.direction === 'x') {
            elements.get(obj.eId).setIsMirroredHorizontal(obj.isMirrored);
            return;
        }
        elements.get(obj.eId).setIsMirroredVertical(obj.isMirrored);
    }

    function updateRotation(obj) {
        // validate element id
        validateElementId(obj.eId);
        // update element rotation
        elements.get(obj.eId).setRotation(obj.rotation);
    }

    comicStore.bus.on('putLayerBack', (eId) => {
        downElement(eId);
    });

    comicStore.bus.on('putLayerFront', (eId) => {
        upElement(eId);
    });

    comicStore.bus.on('pop-closed', () => {
        // logic
    });

    function upElement(eId) {
        props.panel.moveZIndexUp(eId);
        comicStore.bus.emit('z-indexChange');
    }

    function downElement(eId) {
        props.panel.moveZIndexDown(eId);
        comicStore.bus.emit('z-indexChange');
    }

    onUpdated(() => {});

    onBeforeUnmount(() => {
        comicStore.bus.off('putLayerBack');
        comicStore.bus.off('putLayerFront');
    });
</script>

<template>
    <div>
        <div ref="container" class="panel container">
            <DragResizeRotate
                v-for="[key, value] in elements"
                :key="key"
                :altText="value.alt"
                :eId="value.currentState().id"
                :h="value.currentState().height"
                :isMirroredHorizontal="value.currentState().isMirroredHorizontal"
                :isMirroredVertical="value.currentState().isMirroredVertical"
                :rotation="value.currentState().rotation"
                :pos="value.currentState().pos"
                :url="value.currentState().src"
                :w="value.currentState().width"
                :z="value.z"
                :fontSize="value.currentState().type.name == 'Text' ? value.currentState().type.fontSize : 0"
                :text="value.currentState().type.content == undefined ? '' : value.currentState().type.content"
                :selectedId="props.selectedId"
                :lockAspectRatio="props.lockAspectRatio"
                :panel="props.panel"
                :element="value"
                @delete-event="deleteElement"
                @update-event="updatePosition"
                @resize-event="resizeElement"
                @mirror-horizontal-event="updateMirrorValues"
                @mirror-vertical-event="updateMirrorValues"
                @rotate-event="updateRotation"
                @front-event="upElement"
                @back-event="downElement"
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
        padding: 0;

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

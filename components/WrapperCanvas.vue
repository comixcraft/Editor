<script setup>
    const props = defineProps({
        height: Number,
        panel: Object,
    });

    const comicStore = useComicStore();
    const canvasHeight = computed(() => props.height + 'px');
    const canvasWidth = computed(() => props.panel.currentState().width + 'px');

    let elements = props.panel.elements;
    const border = props.panel.border;

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
    <div>
        <div ref="container" class="panel">
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
                :fontSize="value.currentState().type.name == 'Text' ? value.currentState().type.fontSize : 0"
                :text="value.currentState().type.content == undefined ? '' : value.currentState().type.content"
                :element="value"
                @delete-event="deleteElement"
                @update-event="updatePosition"
                @resize-event="resizeElement"
                @mirror-event="mirrorElement"
            />
            <img :src="border" class="panel__border" />
            <!-- <TextEditor v-if="comicStore.getCurrentElement().value != null" /> -->
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
        }
    }
</style>

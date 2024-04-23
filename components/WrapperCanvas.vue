<script setup>
    const props = defineProps({
        height: Number,
        panel: Object,
    });

    const canvasHeight = computed(() => props.height + 'px');
    const canvasWidth = computed(() => props.panel.currentState().width + 'px');

    let clicksOnText = ref(0);
    let modifyTextActive = ref(false);
    let textEditor = ref(null);
    let currentElement = ref(null);

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

    function startModifyText(obj) {
        let element = elements.get(obj.id);
        clicksOnText.value++;
        if (clicksOnText.value === 2) {
            modifyTextActive.value = true;
            nextTick(() => {
                currentElement.value = element;
                textEditor.value.startModifyText(element);
            });
        }
    }

    function stopModifyText() {
        modifyTextActive.value = false;
        resetClicksOnText();
    }

    function resetClicksOnText() {
        clicksOnText.value = 0;
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
                :fontSize="value.currentState().type.name == 'Text' ? value.currentState().type.fontSize : 24"
                :type="value.currentState().type"
                @delete-event="deleteElement"
                @update-event="updatePosition"
                @resize-event="resizeElement"
                @mirror-event="mirrorElement"
                @modify-text-event="startModifyText"
                @reset-clicks-on-text-event="resetClicksOnText"
            />
            <img :src="border" class="panel__border" />
            <TextEditor
                ref="textEditor"
                v-show="modifyTextActive"
                :currentElement="currentElement"
                @stop-modify-text-event="stopModifyText"
            />
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

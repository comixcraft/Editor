<script setup>
    const props = defineProps({
        panel: Object,
    });

    let elements = props.panel.currentState().elements;
    let clicksOnText = ref(0);
    let modifyTextActive = ref(false);
    let textEditor = ref(null);
    let currentElement = ref(null);

    function deleteElement(elId) {
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
    }

    function resetClicksOnText() {
        clicksOnText.value = 0;
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
            :fontSize="value.currentState().type.getName() == 'Text' ? value.currentState().type.getFontSize() : 24"
            @delete-event="deleteElement"
            @update-event="updatePosition"
            @resize-event="resizeElement"
            @mirror-event="mirrorElement"
            @modify-text-event="startModifyText"
            @reset-clicksOnText-event="resetClicksOnText"
            :type="value.currentState().type"
        />
        <TextEditor
            ref="textEditor"
            v-show="modifyTextActive"
            :currentElement="currentElement"
            @reset-clicks-cn-text-event="resetClicksOnText"
            @stop-modify-text-event="stopModifyText"
        />
    </div>
</template>

<style scoped lang="scss">
    .wrapper {
        /* TODO: should be defined dynamically once the value comes from template */
        width: 450px;
        height: 750px;

        border: 1px solid #000;
        overflow: hidden;
        display: grid;
    }
</style>

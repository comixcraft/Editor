<script setup>
    const props = defineProps({
        panel: Object,
    });

    let elements = props.panel.currentState().elements;
    const textarea = ref(null);
    let clicks = ref(0);
    let modifyTextActive = ref(false);
    let placeholderText = ref('yeah!');
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
        clicks.value++;
        if (clicks.value === 2) {
            modifyTextActive.value = true;
            nextTick(() => {
                currentElement.value = element;
                textarea.value.focus();
                placeholderText.value = element.currentState().type.getContent();
            });
        }
    }

    function stopModifyText() {
        modifyTextActive.value = false;
        clicks.value = 0;
        currentElement.value.currentState().type.setContent(textarea.value.value);
        textarea.value.value = '';
    }

    function resetClicks() {
        clicks.value = 0;
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
            @modify-text-event="startModifyText"
            @reset-clicks-event="resetClicks"
            :type="value.currentState().type"
        />
        <div class="textarea__container" v-show="modifyTextActive">
            <textarea tabindex="0" :value="placeholderText" ref="textarea" @blur="stopModifyText"></textarea>
        </div>
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
    .textarea__container {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        background-color: rgba(184 184 184 / 0.5);
    }
</style>

<script setup>
    const props = defineProps({
        panel: Object,
    });

    const textarea = ref(null);
    const fontSizeContainer = ref(null);
    let elements = props.panel.currentState().elements;
    let clicks = ref(0);
    let modifyTextActive = ref(false);
    let textValue = ref('yeah!');
    let fontSize = ref();
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
                textValue.value = element.currentState().type.getContent();
                fontSize.value = element.currentState().type.getFontSize();
            });
        }
    }

    function saveText() {
        currentElement.value.currentState().type.setContent(textarea.value.value);
        textValue.value = textarea.value.value;
    }

    function enterText(e) {
        e.preventDefault();
        saveText(); // needed to update the text in the element
        stopModifyText(e);
    }

    function stopModifyText(e) {
        if (
            (!e.target.classList.contains('textEditor') &&
                !e.target.classList.contains('fontSize__button') &&
                !e.target.classList.contains('fontSize')) ||
            e.key === 'Enter'
        ) {
            modifyTextActive.value = false;
            clicks.value = 0;
            currentElement.value.currentState().type.setContent(textarea.value.value);
            textarea.value.value = '';
        }
    }

    function increaseFont() {
        currentElement.value.currentState().type.increaseFontSize();
        fontSize.value = currentElement.value.currentState().type.getFontSize();
    }

    function decreaseFont() {
        currentElement.value.currentState().type.decreaseFontSize();
        fontSize.value = currentElement.value.currentState().type.getFontSize();
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
            :fontSize="value.currentState().type.getName() == 'Text' ? value.currentState().type.getFontSize() : ''"
            @delete-event="deleteElement"
            @update-event="updatePosition"
            @resize-event="resizeElement"
            @mirror-event="mirrorElement"
            @modify-text-event="startModifyText"
            @reset-clicks-event="resetClicks"
            :type="value.currentState().type"
        />
        <div class="textEditor__container" v-show="modifyTextActive" @click="stopModifyText">
            <textarea
                class="textEditor"
                tabindex="0"
                rows="4"
                ref="textarea"
                :style="{ fontSize: fontSize + 'px' }"
                :value="textValue"
                @blur="saveText"
                @keydown.enter="enterText"
            ></textarea>

            <div class="fontSize__container" ref="fontSizeContainer">
                <button class="fontSize__button" @click="decreaseFont">-</button>
                <p class="fontSize">{{ fontSize }}px</p>
                <button class="fontSize__button" @click="increaseFont">+</button>
            </div>
        </div>
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
    .textEditor__container {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        z-index: 100;
        background-color: rgba(184 184 184 / 0.5);

        .textEditor {
            max-width: 350px;
        }
        .fontSize__container {
            background-color: white;
            display: grid;
            align-self: end;
            grid-template-columns: repeat(3, auto);
            border: 1px black solid;
            border-radius: 4px;
            margin-bottom: 0.5rem;

            .fontSize__button {
                background: none;
                border: none;
                padding: 0.25rem 0.5rem;
                cursor: pointer;

                &:hover {
                    background-color: #f1f1f1;
                }
            }

            .fontSize {
                margin: 0;
                padding: 0.25rem 0.5rem;
            }
        }
    }
</style>

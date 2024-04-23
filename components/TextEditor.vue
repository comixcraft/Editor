<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        clicksOnText: Number,
        currentElement: Object,
    });

    const emit = defineEmits(['stopModifyTextEvent']);

    const textarea = ref(null);
    const fontSizeContainer = ref(null);
    const textValue = ref('');
    let fontSize = ref(24);
    let element = ref(null);

    function startModifyText(newElement) {
        element.value = newElement;
        textarea.value.focus();
        textValue.value = element.value.currentState().type.content;
        fontSize.value = element.value.currentState().type.fontSize;
    }

    function stopModifyText(e) {
        if (
            (!e.target.classList.contains('textEditor') &&
                !e.target.classList.contains('fontSize__button') &&
                !e.target.classList.contains('fontSize')) ||
            e.key === 'Enter'
        ) {
            element.value.currentState().type.content = textarea.value.value;
            textarea.value.value = '';
            emit('stopModifyTextEvent');
        }
    }
    function saveText() {
        element.value.currentState().type.content = textarea.value.value;
        textValue.value = textarea.value.value;
    }

    function enterText(e) {
        e.preventDefault();
        saveText(); // needed to update the text in the element
        stopModifyText(e);
    }

    function increaseFont() {
        element.value.currentState().type.increaseFontSize();
        fontSize.value = element.value.currentState().type.fontSize;
    }

    function decreaseFont() {
        element.value.currentState().type.decreaseFontSize();
        fontSize.value = element.value.currentState().type.fontSize;
    }

    defineExpose({
        startModifyText,
    });

    onMounted(() => {});
</script>

<template>
    <div class="textEditor__container" @click="stopModifyText">
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
</template>

<style lang="scss" scoped>
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

<script setup>
    import { modifyText } from '../stores/modifyText.js';

    const textarea = ref(null);
    const fontSizeContainer = ref(null);
    const textValue = ref('');
    let fontSize = ref(24);
    let element = ref(null);

    function startModifyText() {
        element.value = modifyText.currentElement;
        textarea.value.focus();
        textValue.value = element.value.currentState().type.content;
        fontSize.value = element.value.currentState().type.fontSize;
    }

    function stopModifyText(e) {
        if (
            (!e.target.classList.contains('text-editor__textarea') &&
                !e.target.classList.contains('font-size__button') &&
                !e.target.classList.contains('font-size')) ||
            e.key === 'Enter'
        ) {
            element.value.currentState().type.content = textarea.value.value;
            textarea.value.value = '';
            modifyText.setCurrentElement(null);
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

    onMounted(() => {
        startModifyText();
    });
</script>

<template>
    <div class="text-editor" @click="stopModifyText">
        <textarea
            class="text-editor__textarea"
            tabindex="0"
            rows="4"
            ref="textarea"
            :style="{ fontSize: fontSize + 'px' }"
            :value="textValue"
            @blur="saveText"
            @keydown.enter="enterText"
        ></textarea>

        <div class="font-size" ref="fontSizeContainer">
            <button class="font-size__button" @click="decreaseFont">-</button>
            <p class="font-size__text">{{ fontSize }}px</p>
            <button class="font-size__button" @click="increaseFont">+</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .text-editor {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        z-index: 100;
        background-color: rgba(112 112 112 / 0.5);

        &__textarea {
            max-width: 350px;
        }
        .font-size {
            background-color: $white;
            display: grid;
            align-self: end;
            grid-template-columns: repeat(3, auto);
            border: $border-width $black solid;
            border-radius: $border-radius;
            margin-bottom: $spacer-2;

            &__button {
                background: none;
                border: none;
                padding: $spacer-2 $spacer-3;
                cursor: pointer;

                &:hover {
                    background-color: $grey-40;
                }
            }

            &__text {
                margin: 0;
                padding: $spacer-2 $spacer-3;
            }
        }
    }
</style>

<script setup>
    const textarea = ref(null);
    const fontSizeContainer = ref(null);
    const textValue = ref('');
    const comicStore = useComicStore();
    let fontSize = ref(24);
    let element = ref(null);

    function startModifyText() {
        element.value = comicStore.getCurrentElement().value;
        textarea.value.focus();
        textValue.value = element.value.currentState().type.content;
        fontSize.value = element.value.currentState().type.fontSize;
    }

    function stopModifyText() {
        comicStore.bus.emit('updateText', { id: element.value.currentState().id, text: textValue.value });
        element.value.currentState().type.content = textValue.value;
        textarea.value.value = '';
        comicStore.setCurrentElement(null);
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
            v-model="textValue"
            @keydown.enter.prevent="stopModifyText"
        ></textarea>

        <div class="font-size" ref="fontSizeContainer">
            <button class="font-size__button" @click.stop="decreaseFont">-</button>
            <p class="font-size__text">{{ fontSize }}px</p>
            <button class="font-size__button" @click.stop="increaseFont">+</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .text-editor {
        position: absolute;
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

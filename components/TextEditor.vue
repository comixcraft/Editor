<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useComicStore } from '#imports';

    const textarea = ref(null);
    const textValue = ref('');
    const comicStore = useComicStore();
    let fontSize = ref(24);
    let element = ref(null);

    const accumulatedChanges = ref({});

    function startModifyText() {
        element.value = comicStore.getCurrentElement().value;
        textarea.value.focus();
        textValue.value = element.value.type.content;
        fontSize.value = element.value.type.fontSize;
    }

    function applyAccumulatedChanges() {
        const changes = accumulatedChanges.value;
        comicStore.bus.emit('updateText', {
            id: element.value.id,
            text: changes.text || textValue.value,
            fontSize: changes.fontSize || fontSize.value,
        });
        accumulatedChanges.value = {};
    }

    watch(
        [textValue, fontSize],
        ([newTextValue, newFontSize]) => {
            accumulatedChanges.value.text = newTextValue;
            accumulatedChanges.value.fontSize = newFontSize;
        },
        { deep: true }
    );

    function stopModifyText() {
        element.value.type.content = textValue.value;
        applyAccumulatedChanges();
        textValue.value = '';
        comicStore.setCurrentElement(null);
    }

    function increaseFont() {
        element.value.type.increaseFontSize();
        fontSize.value = element.value.type.fontSize;
        accumulatedChanges.value.fontSize = fontSize.value;
    }

    function decreaseFont() {
        element.value.type.decreaseFontSize();
        fontSize.value = element.value.type.fontSize;
        accumulatedChanges.value.fontSize = fontSize.value;
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
            @click.stop="true"
        ></textarea>

        <div class="font-size" @click.stop="true">
            <button class="font-size__button" @click="decreaseFont">-</button>
            <p class="font-size__text">{{ fontSize }}px</p>
            <button class="font-size__button" @click="increaseFont">+</button>
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
        background-color: rgba(112, 112, 112, 0.5);

        &__textarea {
            max-width: 80%;
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

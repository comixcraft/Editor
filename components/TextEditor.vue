<script setup>
    // Imports

    // Middlewares

    // Emits

    // Props

    // Static Variables (let, const)
    const accumulatedChanges = ref({});
    const canvasWidth = ref(0);
    const comicStore = useComicStore();
    const textarea = ref(null);
    const textValue = ref('');
    let element = ref(null);
    let fontSize = ref(24);

    // Reactive Variables
    // computed

    // Reactive

    // Refs

    // Watchers
    watch(
        [textValue, fontSize],
        ([newTextValue, newFontSize]) => {
            accumulatedChanges.value.text = newTextValue;
            accumulatedChanges.value.fontSize = newFontSize;
        },
        { deep: true }
    );

    // Methods
    function applyAccumulatedChanges() {
        const changes = accumulatedChanges.value;
        comicStore.bus.emit('updateText', {
            id: element.value.id,
            text: changes.text || textValue.value,
            fontSize:
                getRelative(changes.fontSize, canvasWidth.value) || getRelative(fontSize.value, canvasWidth.value),
        });
        accumulatedChanges.value = {};
    }

    function decreaseFont() {
        fontSize.value -= 1;
        element.value.type.fontSize = getRelative(fontSize.value, canvasWidth.value);
        accumulatedChanges.value.fontSize = fontSize.value;
    }

    function getFixed(num, panelNum) {
        return num * panelNum;
    }

    function getRelative(num, panelNum) {
        return num / panelNum;
    }

    function increaseFont() {
        fontSize.value += 1;
        element.value.type.fontSize = getRelative(fontSize.value, canvasWidth.value);
        accumulatedChanges.value.fontSize = fontSize.value;
    }

    function startModifyText() {
        element.value = comicStore.getCurrentElement().value;
        textarea.value.focus();
        textValue.value = element.value.type.content;
        fontSize.value = getFixed(element.value.type.fontSize, canvasWidth.value);
    }

    function stopModifyText() {
        element.value.type.content = textValue.value;
        applyAccumulatedChanges();
        textValue.value = '';
        comicStore.setCurrentElement(null);
    }

    // Bus Listeners

    // Vue life cycle hooks
    onMounted(() => {
        canvasWidth.value = comicStore.getCurrentCanvas().width;
        startModifyText();
    });

    // expose (defineExpose)
</script>

<template>
    <div class="text-editor" @click="stopModifyText">
        <textarea
            class="text-editor__textarea"
            tabindex="0"
            ref="textarea"
            :style="{ fontSize: fontSize + 'px' }"
            v-model="textValue"
            @keydown.enter.prevent="stopModifyText"
            @click.stop="true"
        ></textarea>

        <div class="font-size" @click.stop="true">
            <button class="font-size__button" @click="increaseFont">+</button>
            <p class="font-size__text p5">{{ fontSize }}</p>
            <button class="font-size__button" @click="decreaseFont">-</button>
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
        display: flex;
        justify-content: center;
        align-items: center;
        gap: $spacer-3;
        z-index: 1;
        background-color: rgba($medium-grey-100, 0.5);

        &__textarea {
            width: calc(80% - $spacer-7);
            height: 40svh;
        }

        .font-size {
            background-color: $white;
            display: grid;
            grid-template-rows: repeat(3, auto);
            border: $border-width $black solid;
            border-radius: $border-radius;
            user-select: none;

            &__button {
                background: none;
                border: none;
                padding: $spacer-2 $spacer-3;
                cursor: pointer;
                color: $black;

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

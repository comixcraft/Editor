<script setup>
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

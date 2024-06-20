<script setup>
    const props = defineProps({
        element: Object,
    });
    const emits = defineEmits([
        'deleteEvent',
        'mirrorHorizontalEvent',
        'mirrorVerticalEvent',
        'frontEvent',
        'backEvent',
        'changeTextAlign',
    ]);

    const currAlignment = ref(undefined);
    const currIndex = ref(undefined);
    const textAlign = {
        left: 'format_align_left',
        center: 'format_align_center',
        right: 'format_align_right',
    };
    function handleTextAlignSwitch() {
        currIndex.value++;
        if (currIndex.value >= Object.keys(textAlign).length) {
            currIndex.value = 0;
        }
        currAlignment.value = Object.keys(textAlign)[currIndex.value];
        emits('changeTextAlign', currAlignment.value);
    }

    function sendUp() {
        emits('frontEvent');
        generateToast('info', 'Element moved forward one step.');
    }

    function sendDown() {
        emits('backEvent');
        generateToast('info', 'Element moved backward one step.');
    }

    onMounted(() => {
        currAlignment.value = props.element.type.textAlign;
        currIndex.value = Object.keys(textAlign).indexOf(currAlignment.value);
    });
</script>

<template>
    <div>
        <div class="icon-container">
            <div class="edit-icon icon" @click="$emit('deleteEvent')">delete</div>
            <div class="edit-icon icon" @click="sendUp">flip_to_front</div>
            <div class="edit-icon icon" @click="sendDown">flip_to_back</div>
            <div class="edit-icon icon" @click="$emit('mirrorHorizontalEvent')">flip</div>
            <div class="edit-icon--flipped edit-icon icon" @click="$emit('mirrorVerticalEvent')">flip</div>
            <div class="edit-icon icon" @click="handleTextAlignSwitch" v-if="props.element.type.name === 'Text'">
                {{ textAlign[currAlignment] }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .icon-container {
        z-index: 99999;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: $spacer-1 $spacer-1;
        display: grid;
        border: $border-width solid $light-grey-100;
        border-radius: $border-radius;
        background-color: $white;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: 1fr;
        pointer-events: auto;
    }

    .edit-icon {
        padding: $spacer-1 $spacer-2;
        user-select: none;
        cursor: pointer;
        border-bottom: $border-width solid $light-grey-100;
        &:hover {
            scale: 1.2;
        }

        &--flipped {
            transform: rotate(-90deg);
            border-bottom: none;
            border-left: $border-width solid $light-grey-100;
        }
    }
    .edit-icon:last-child {
        border: none;
    }
</style>

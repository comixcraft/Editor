<script setup>
    const props = defineProps({
        element: Object,
        lockAspectRatio: Boolean,
    });
    const emits = defineEmits([
        'deleteEvent',
        'mirrorHorizontalEvent',
        'mirrorVerticalEvent',
        'frontEvent',
        'backEvent',
        'changeTextAlign',
        'lockAspectRatio',
    ]);

    const currAlignment = ref(undefined);
    const currIndex = ref(undefined);
    const aspectRatioIsLocked = ref(undefined);
    const textAlign = {
        left: 'format_align_left',
        center: 'format_align_center',
        right: 'format_align_right',
    };
    const flipIcon = {
        true: 'link',
        false: 'link_off',
    };
    function handleTextAlignSwitch() {
        currIndex.value++;
        if (currIndex.value >= Object.keys(textAlign).length) {
            currIndex.value = 0;
        }
        currAlignment.value = Object.keys(textAlign)[currIndex.value];
        emits('changeTextAlign', currAlignment.value);
    }

    function handleAspectRatio() {
        aspectRatioIsLocked.value = !aspectRatioIsLocked.value;
        emits('lockAspectRatio', aspectRatioIsLocked.value);
    }

    onMounted(() => {
        aspectRatioIsLocked.value = props.lockAspectRatio;
        currAlignment.value = props.element.type.textAlign;
        currIndex.value = Object.keys(textAlign).indexOf(currAlignment.value);
    });
</script>

<template>
    <div>
        <div class="icon-container">
            <div class="edit-icon icon" @click="$emit('deleteEvent')" title="Delete">delete</div>
            <div class="edit-icon icon" @click="$emit('frontEvent')" title="Bring Forward">flip_to_front</div>
            <div class="edit-icon icon" @click="$emit('backEvent')" title="Send Backward">flip_to_back</div>
            <div class="edit-icon icon" @click="$emit('mirrorHorizontalEvent')" title="Flip Horizontal">flip</div>
            <div class="edit-icon--flipped edit-icon icon" @click="$emit('mirrorVerticalEvent')" title="Flip Vertical">
                flip
            </div>
            <div
                class="edit-icon icon"
                @click="handleTextAlignSwitch"
                v-if="props.element.type.name === 'Text'"
                title="Align Text"
            >
                {{ textAlign[currAlignment] }}
            </div>
            <div
                class="edit-icon icon edit-icon--crossed"
                @click="handleAspectRatio"
                v-if="props.element.type.name === 'Asset'"
                title="Lock Aspect Ratio"
            >
                {{ flipIcon[aspectRatioIsLocked] }}
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
        position: relative;
        padding: $spacer-1 $spacer-2;
        user-select: none;
        cursor: pointer;
        border-bottom: $border-width solid $light-grey-100;
        @include media-breakpoint-up(lg) {
            &:hover {
                scale: 1.2;
            }
        }

        &--flipped {
            transform: rotate(-90deg);
            border-bottom: none;
            border-left: $border-width solid $light-grey-100;
        }

        &--crossed {
            transform: rotate(-90deg) scaleX(-1);
        }
    }

    .edit-icon:last-child {
        border: none;
    }
</style>

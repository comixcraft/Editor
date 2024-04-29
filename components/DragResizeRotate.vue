<script setup>
    const props = defineProps({
        z: Number,
        w: Number,
        h: Number,
        altText: String,
        url: String,
        eId: String,
        pos: Object,
        isMirroredHorizontal: Boolean,
        isMirroredVertical: Boolean,
        rotation: Number,
        fontSize: Number, // if 0, it's an image, if not, it's text
        text: String,
        element: Object,
    });

    const comicStore = useComicStore();
    // Define static variable
    let elementActive = false;
    let tL, tR, bR, bL;
    let isRotating = ref(false);
    let isResizing = ref(false);
    let text = ref(props.text);
    let fontSize = ref(props.fontSize);

    // Define reactive variables
    const angle = ref(props.rotation);
    let mirroredHorizontal = ref(props.isMirroredHorizontal);
    let mirroredVertical = ref(props.isMirroredVertical);
    let self = ref(null);
    let center = reactive({
        x: undefined,
        y: undefined,
    });

    // Define emits
    const emit = defineEmits([
        'deleteEvent',
        'updateEvent',
        'resizeEvent',
        'mirrorHorizontalEvent',
        'mirrorVerticalEvent',
        'rotateEvent',
    ]);

    // onMounted functions
    // onMounted(() => {
    //     center = getCenter();
    // });

    // computed functions
    const editionMenuStyle = computed(() => ({
        transform: `rotate(${-angle.value}deg)`,
    }));

    const setMirroredHorizontal = computed(() => {
        return mirroredHorizontal.value ? '-1' : '1';
    });

    const setMirroredVertical = computed(() => {
        return mirroredVertical.value ? '-1' : '1';
    });

    // Define functions
    function rotating(val) {
        angle.value = val;
        isRotating.value = true;
    }

    function resize(eId) {
        // center = getCenter();
        isResizing.value = false;

        emit('resizeEvent', {
            eId: eId,
            width: self.value.width,
            height: self.value.height,
            pos: { x: self.value.left, y: self.value.top },
        });
    }

    function updatePosition(eId) {
        // center = getCenter();

        emit('updateEvent', { eId: eId, pos: { x: self.value.left, y: self.value.top } });
    }

    function updateRotation(eId) {
        isRotating.value = false;
        emit('rotateEvent', { eId: eId, rotation: angle.value });
    }

    function updateMirroring(eId, direction) {
        console.log(direction);
        if (direction === 'x') {
            // mirror the image on editor
            mirroredHorizontal.value = !mirroredHorizontal.value;
            emit('mirrorHorizontalEvent', {
                eId: eId,
                direction: direction,
                isMirrored: mirroredHorizontal.value,
            });
        } else if (direction === 'y') {
            // mirror the image on editor
            mirroredVertical.value = !mirroredVertical.value;
            emit('mirrorVerticalEvent', {
                eId: eId,
                direction: direction,
                isMirrored: mirroredVertical.value,
            });
        }
    }

    onMounted(() => {
        comicStore.bus.on('updateText', (obj) => {
            if (obj.id == props.eId) {
                text.value = obj.text;
                fontSize.value = obj.fontSize;
            }
        });
    });

    // function updateCornersPosition() {
    //     tL = { x: self.value.left, y: self.value.top };
    //     tR = { x: self.value.left + self.value.width, y: self.value.top };
    //     bR = { x: self.value.left + self.value.width, y: self.value.top + self.value.height };
    //     bL = { x: self.value.left, y: self.value.top + self.value.height };
    // }

    // function getCenter() {
    //     updateCornersPosition();
    //     return {
    //         x: (tL.x + tR.x + bR.x + bL.x) / 4,
    //         y: (tL.y + tR.y + bR.y + bL.y) / 4,
    //     };
    // }
</script>

<template>
    <VueDragResizeRotate
        :z="z"
        :w="w"
        :h="h"
        :eId="eId"
        class-name-active="element--active"
        ref="self"
        :disableUserSelect="true"
        :x="pos.currPos().x"
        :y="pos.currPos().y"
        :parent="true"
        :rotatable="true"
        :resizable="true"
        :draggable="true"
        :r="angle"
        @rotating="rotating"
        @resizing="isResizing = true"
        @activated="() => (elementActive = true)"
        @deactivated="() => (elementActive = false)"
        @dragstop="updatePosition(eId)"
        @resizestop="resize(eId)"
        @rotatestop="updateRotation(eId)"
    >
        <EditionMenu
            v-if="elementActive && !isRotating && !isResizing"
            :style="editionMenuStyle"
            :rotationAngle="angle"
            @mirror-horizontal-event="updateMirroring(eId, (direction = 'x'))"
            @mirror-vertical-event="updateMirroring(eId, (direction = 'y'))"
            @delete-event="$emit('deleteEvent', eId)"
        />
        <div
            tabindex="-1"
            class="text"
            :class="{ mirror: mirroredHorizontal || mirroredVertical }"
            v-if="fontSize != 0"
            @dblclick="comicStore.setCurrentElement(props.element)"
        >
            <p class="text__content" :style="{ fontSize: fontSize + 'px' }">
                {{ text }}
            </p>
        </div>

        <img
            :src="url"
            :alt="altText"
            :class="{ mirror: mirroredHorizontal || mirroredVertical }"
            v-if="fontSize == 0"
        />
    </VueDragResizeRotate>
</template>

<style lang="scss" scoped>
    img {
        width: 100%;
        height: 100%;
    }

    .element--active {
        border: $border-width solid $info;
    }

    .mirror {
        transform: scale(v-bind(setMirroredHorizontal), v-bind(setMirroredVertical));
    }

    .text {
        width: 100%;
        height: 100%;

        &__content {
            width: 100%;
            height: 100%;
            font-family: 'Pangolin';
            word-break: break-word;
        }
    }
</style>

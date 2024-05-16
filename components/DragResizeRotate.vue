<script setup>
    const props = defineProps({
        z: Number,
        w: Number,
        h: Number,
        x: Number,
        y: Number,
        altText: String,
        url: String,
        eId: String,
        pos: Object,
        isMirroredHorizontal: Boolean,
        isMirroredVertical: Boolean,
        rotation: Number,
        fontSize: Number, // if 0, it's an image, if not, it's text
        text: String,
        lockAspectRatio: Boolean,
        element: Object,
    });

    const comicStore = useComicStore();
    // Define static variable
    let elementActive = ref(false);
    let tL, tR, bR, bL;
    let isRotating = ref(false);
    let isResizing = ref(false);
    let text = ref(props.text);
    let fontSize = ref(props.fontSize);
    let maxDiagonal = ref('0px');
    let counterRotation = ref('0deg');
    let tapedTwice = ref(false);

    // Define reactive variables
    const angle = ref(props.rotation);
    let mirroredHorizontal = ref(props.isMirroredHorizontal);
    let mirroredVertical = ref(props.isMirroredVertical);
    let self = ref(null);

    // Define emits
    const emit = defineEmits([
        'deleteEvent',
        'updateEvent',
        'resizeEvent',
        'mirrorHorizontalEvent',
        'mirrorVerticalEvent',
        'rotateEvent',
        'backEvent',
        'frontEvent',
    ]);

    // computed functions
    const setMirroredHorizontal = computed(() => {
        return mirroredHorizontal.value ? '-1' : '1';
    });

    const setMirroredVertical = computed(() => {
        return mirroredVertical.value ? '-1' : '1';
    });

    function upZIndex(eId) {
        emit('frontEvent', eId);
    }

    function downZIndex(eId) {
        emit('backEvent', eId);
    }

    function rotating(val) {
        angle.value = val;
        isRotating.value = true;
    }

    function resize(eId) {
        isResizing.value = false;
        updateBB();
        emit('resizeEvent', {
            eId: eId,
            width: self.value.width,
            height: self.value.height,
            pos: { x: self.value.left, y: self.value.top },
        });
    }

    function updatePosition(eId) {
        updateBB();
        emit('updateEvent', { eId: eId, pos: { x: self.value.left, y: self.value.top } });
    }

    function updateRotation(eId) {
        isRotating.value = false;
        counterRotation.value = `${-angle.value}deg`;
        emit('rotateEvent', { eId: eId, rotation: angle.value });
    }

    function updateMirroring(eId, direction) {
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
        updateBB();
        counterRotation.value = `${-angle.value}deg`;
        comicStore.bus.on('updateText', (obj) => {
            if (obj.id == props.eId) {
                text.value = obj.text;
                fontSize.value = obj.fontSize;
            }
        });
    });

    function detectDoubleClick(e) {
        if (!tapedTwice.value) {
            tapedTwice.value = true;
            setTimeout(function () {
                tapedTwice.value = false;
            }, 300);
            return false;
        }
        e.preventDefault();
        comicStore.setCurrentElement(props.element);
    }

    function updateCornersPosition() {
        tL = { x: self.value.left, y: self.value.top };
        tR = { x: self.value.left + self.value.width, y: self.value.top };
        bR = { x: self.value.left + self.value.width, y: self.value.top + self.value.height };
        bL = { x: self.value.left, y: self.value.top + self.value.height };
    }

    function updateBB() {
        updateCornersPosition();
        let d1 = Math.sqrt(Math.pow(tL.x - bR.x, 2) + Math.pow(tL.y - bR.y, 2));
        let d2 = Math.sqrt(Math.pow(tR.x - bL.x, 2) + Math.pow(tR.y - bL.y, 2));

        maxDiagonal.value = `${Math.max(d1, d2)}px`;
    }
</script>

<template>
    <VueDragResizeRotate
        :id="eId"
        :z="z"
        :w="w"
        :h="h"
        :eId="eId"
        class-name-active="element--active"
        ref="self"
        :x="x"
        :y="y"
        :parent="true"
        :rotatable="true"
        :resizable="true"
        :draggable="true"
        :r="angle"
        :lockAspectRatio="props.lockAspectRatio"
        :style="{ zIndex: props.z }"
        @rotating="rotating"
        @resizing="isResizing = true"
        @activated="() => (elementActive = true)"
        @deactivated="() => (elementActive = false)"
        @dragstop="updatePosition(eId)"
        @resizestop="resize(eId)"
        @rotatestop="updateRotation(eId)"
    >
        <div class="edition-menu">
            <EditionMenu
                v-if="elementActive && !isRotating && !isResizing"
                @mirror-horizontal-event="updateMirroring(eId, (direction = 'x'))"
                @mirror-vertical-event="updateMirroring(eId, (direction = 'y'))"
                @delete-event="$emit('deleteEvent', eId)"
                @front-event="upZIndex(eId)"
                @back-event="downZIndex(eId)"
            />
        </div>
        <div
            tabindex="-1"
            class="text"
            :class="{ mirror: mirroredHorizontal || mirroredVertical }"
            v-if="fontSize != 0"
            @dblclick="comicStore.setCurrentElement(props.element)"
            @touchstart="detectDoubleClick"
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

    .edition-menu {
        position: absolute;
        z-index: -1;
        display: flex;
        justify-content: flex-end;
        width: v-bind(maxDiagonal);
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(v-bind(counterRotation));
        pointer-events: none;
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

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
    });

    let elementActive = false;
    // Define reactive variables
    let mirroredHorizontal = ref(props.isMirroredHorizontal);
    let mirroredVertical = ref(props.isMirroredVertical);
    const angle = ref(props.rotation);
    let self = ref(null);

    // computed function to set the mirroring of the image
    const setMirroredHorizontal = computed(() => {
        return mirroredHorizontal.value ? '-1' : '1';
    });

    const setMirroredVertical = computed(() => {
        return mirroredVertical.value ? '-1' : '1';
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

    // Define functions
    function rotating(val) {
        angle.value = val;
    }

    function resize(eId) {
        emit('resizeEvent', {
            eId: eId,
            width: self.value.width,
            height: self.value.height,
            pos: { x: self.value.left, y: self.value.top },
        });
    }

    function updatePosition(eId) {
        emit('updateEvent', { eId: eId, pos: { x: self.value.left, y: self.value.top } });
    }

    function updateRotation(eId) {
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
        @activated="() => (elementActive = true)"
        @deactivated="() => (elementActive = false)"
        @dragstop="updatePosition(eId)"
        @resizestop="resize(eId)"
        @rotatestop="updateRotation(eId)"
    >
        <EditionMenu
            v-if="elementActive"
            @mirror-horizontal-event="updateMirroring(eId, (direction = 'x'))"
            @mirror-vertical-event="updateMirroring(eId, (direction = 'y'))"
            @delete-event="$emit('deleteEvent', eId)"
        />
        <img :alt="altText" :class="{ mirror: mirroredHorizontal || mirroredVertical }" :src="url" />
    </VueDragResizeRotate>
</template>

<style lang="scss" scoped>
    img {
        width: 100%;
        height: 100%;
    }

    .element--active {
        border: 1px solid black;
    }

    .mirror {
        transform: scale(v-bind(setMirroredHorizontal), v-bind(setMirroredVertical));
    }
</style>

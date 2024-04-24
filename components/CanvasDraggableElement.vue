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
        isRotated: Boolean,
    });

    let elementActive = false;
    let mirroredHorizontal = ref(props.isMirroredHorizontal);
    let mirroredVertical = ref(props.isMirroredVertical);
    let self = ref(null);
    let rotation = ref(props.rotation);
    let isRotated = ref(props.isRotated);

    // computed function to set the mirroring of the image
    const setMirroredHorizontal = computed(() => {
        return mirroredHorizontal.value ? '-1' : '1';
    });

    const setMirroredVertical = computed(() => {
        return mirroredVertical.value ? '-1' : '1';
    });

    // computed function to set the rotation of the image
    const setRotation = computed(() => {
        return rotation.value + 'deg';
    });

    const emit = defineEmits([
        'deleteEvent',
        'updateEvent',
        'resizeEvent',
        'mirrorHorizontalEvent',
        'mirrorVerticalEvent',
        'rotateLeftEvent',
        'rotateRightEvent',
    ]);

    function updatePosition(eId) {
        emit('updateEvent', { id: eId, pos: { x: self.value.left, y: self.value.top } });
    }

    function resize(eId) {
        emit('resizeEvent', {
            id: eId,
            width: self.value.width,
            height: self.value.height,
            pos: { x: self.value.left, y: self.value.top },
        });
    }

    function updateMirroring(eId, direction) {
        if (direction === 'horizontal') {
            // mirror the image on editor
            mirroredHorizontal.value = !mirroredHorizontal.value;
            emit('mirrorHorizontalEvent', {
                id: eId,
                mirror: mirroredHorizontal.value,
            });
        } else {
            // mirror the image on editor
            mirroredVertical.value = !mirroredVertical.value;
            emit('mirrorVerticalEvent', {
                id: eId,
                mirror: mirroredVertical.value,
            });
        }
    }

    function updateRotation(eId, direction) {
        // Count the number of true values for mirroring
        let mirrorCount = [mirroredHorizontal.value, mirroredVertical.value].filter(Boolean).length;

        // If the count is odd, swap the directions (to keep the perceived direction consistent)
        if (mirrorCount % 2 === 1) {
            direction = direction === 'left' ? 'right' : 'left';
        }

        if (direction === 'left') {
            rotation.value -= 90;
            if (rotation.value < 0) rotation.value = 270;
            emit('rotateLeftEvent', { id: eId, rotation: rotation.value });
        } else if (direction === 'right') {
            rotation.value += 90;
            if (rotation.value >= 360) rotation.value = 0;
            emit('rotateRightEvent', { id: eId, rotation: rotation.value });
        }

        if (rotation.value === 0 || rotation.value === 180) {
            isRotated.value = false;
        } else {
            isRotated.value = true;
        }

        console.log(rotation.value, isRotated);
    }
</script>

<template>
    <DraggableResizable
        ref="self"
        :disableUserSelect="true"
        :eId="eId"
        :h="h"
        :parent="true"
        :w="w"
        :x="pos.currPos().x"
        :y="pos.currPos().y"
        :z="z"
        class-name-active="element--active"
        @activated="() => (elementActive = true)"
        @deactivated="() => (elementActive = false)"
        @drag-stop="updatePosition(eId)"
        @resize-stop="resize(eId)"
    >
        <EditionMenu
            v-if="elementActive"
            @mirror-horizontal-event="updateMirroring(eId, (direction = 'horizontal'))"
            @mirror-vertical-event="updateMirroring(eId, (direction = 'vertical'))"
            @rotate-left-event="updateRotation(eId, (direction = 'left'))"
            @rotate-right-event="updateRotation(eId, (direction = 'right'))"
            @delete-event="$emit('deleteEvent', eId)"
        />
        <img :alt="altText" :class="{ transform: mirroredHorizontal || mirroredVertical || rotation > 0 }" :src="url" />
    </DraggableResizable>
</template>

<style lang="scss" scoped>
    img {
        width: 100%;
        height: 100%;
    }

    .element--active {
        border: $border-width solid $info;
    }

    .transform {
        transform: scale(v-bind(setMirroredHorizontal), v-bind(setMirroredVertical)) rotate(v-bind(setRotation));
    }
</style>

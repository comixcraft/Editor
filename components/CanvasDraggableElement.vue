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
    });

    let elementActive = false;
    let mirroredHorizontal = ref(props.isMirroredHorizontal);
    let mirroredVertical = ref(props.isMirroredVertical);
    let self = ref(null);

    const setMirroredHorizontal = computed(() => {
        return mirroredHorizontal.value ? '-1' : '1';
    });

    const setMirroredVertical = computed(() => {
        return mirroredVertical.value ? '-1' : '1';
    });

    const emit = defineEmits([
        'deleteEvent',
        'updateEvent',
        'resizeEvent',
        'mirrorHorizontalEvent',
        'mirrorVerticalEvent',
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
            @delete-event="$emit('deleteEvent', eId)"
        />
        <img :alt="altText" class="mirror" :src="url" />
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

    .mirror {
        transform: scale(v-bind(setMirroredHorizontal), v-bind(setMirroredVertical));
    }
</style>

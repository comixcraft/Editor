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
    });

    let elementActive = false;
    let mirroredHorizontal = ref(props.isMirroredHorizontal);
    let self = ref(null);

    const setMirroredHorizontal = computed(() => {
        return mirroredHorizontal.value ? '-1' : '1';
    });

    const emit = defineEmits(['deleteEvent', 'updateEvent', 'resizeEvent', 'mirrorEvent']);

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

    function updateMirroring(eId) {
        // mirror the image on editor
        this.mirroredHorizontal = !this.mirroredHorizontal;
        emit('mirrorEvent', {
            id: eId,
            mirror: this.mirroredHorizontal,
        });
    }

    function updateVerticalMirroring(eId) {
        console.log('updateVerticalMirroring');
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
            @mirror-event="updateMirroring(eId)"
            @mirror-vertical-event="updateVerticalMirroring(eId)"
            @delete-event="$emit('deleteEvent', eId)"
        />
        <img :alt="altText" :class="{ mirror: mirroredHorizontal }" :src="url" />
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
        transform: scaleX(v-bind(setMirroredHorizontal));
    }
</style>

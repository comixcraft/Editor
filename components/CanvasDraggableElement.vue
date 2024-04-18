<script setup>
    const props = defineProps({
        z: Number,
        w: Number,
        h: Number,
        altText: String,
        url: String,
        eId: Number,
        pos: Object,
        isMirrored: Boolean,
    });

    let elementActive = false;
    let mirrored = ref(props.isMirrored);
    let self = ref(null);

    const emit = defineEmits(['deleteEvent', 'updateEvent']);

    function updatePosition(eId) {
        emit('updateEvent', { id: eId, self: self });
    }

    function resize(eId) {
        // check what map entry correspond to id
        let matchingIdEntry;
        elementsInCanvas.forEach((value, key) => {
            if (value.currentState().id === eId) matchingIdEntry = value;
        });
        if (!matchingIdEntry) {
            console.log('Error in id passing for updatePosition function [CanvasDraggableElement:20]');
            return;
        }

        matchingIdEntry.setPos({ x: self.value.left, y: self.value.top });
        matchingIdEntry.setWidth(self.value.width);
        matchingIdEntry.setHeight(self.value.height);
    }

    function updateMirroring(eId) {
        // mirror the image on editor
        this.mirrored = !this.mirrored;
        // recover the element
        let matchingIdEntry;
        elementsInCanvas.forEach((value, key) => {
            if (value.currentState().id === eId) matchingIdEntry = value;
        });
        if (!matchingIdEntry) {
            console.log('Error in id passing for updatePosition function [CanvasDraggableElement:20]');
            return;
        }
        // update isMirrored of element
        matchingIdEntry.setIsMirrored(this.mirrored);
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
            @delete-event="$emit('deleteEvent', z)"
        />
        <img :alt="altText" :class="{ mirror: mirrored }" :src="url" />
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
        transform: scaleX(-1);
    }
</style>

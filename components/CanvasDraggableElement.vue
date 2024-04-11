<script setup>
    import ElementDS from '../utils/Classes/Element.js'

    defineProps({
        z: Number,
        w: Number,
        h: Number,
        altText: String,
        url: String,
        eId: Number,
    })

    let elementActive = false;
    let isMirrored = ref(false);
    let self = ref(null);

    function updatePosition(eId) {
        // check what map entry correspond to id
        let matchingIdEntry;
        elementsInCanvas.value.forEach((value, key) => {
            if (value.currentState().id === eId) matchingIdEntry = value;
        })
        if (!matchingIdEntry) {
            console.log('Error in id passing for updatePosition function [CanvasDraggableElement:20]')
            return;
        }
        // update position of element
        matchingIdEntry.setPos({x: self.value.left, y: self.value.top})
    }


</script>

<template>
        <DraggableResizable
        :z="z"
        :w="w" 
        :h="h" 
        :eId="eId"
        :parent="true" 
        class-name-active="elementActive"
        :disableUserSelect="true"
        ref="self"
        @activated="function() {elementActive = !elementActive}"
        @deactivated="function() {elementActive = !elementActive}"
        @dragging="updatePosition(eId)">
            <EditionMenu 
            v-if="elementActive"
            @mirror-event="function() {isMirrored = !isMirrored}"
            @delete-event="$emit('deleteEvent',  z)"
            />
            <img :src="url" :alt="altText" :class="{mirror : isMirrored}">
        </DraggableResizable>
</template>

<style scoped lang="scss">
    img {
        width: 100%;
        height: 100%;
    }

    .elementActive {
        border: $border-width solid $info;
    }

    .mirror {
        transform: scaleX(-1);
    }
</style>
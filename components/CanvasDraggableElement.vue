<script setup>
    import ElementDS from '../utils/Classes/Element.js';
    import { ref } from 'vue';

    const props = defineProps({
        z: Number,
        w: Number,
        h: Number,
        altText: String,
        url: String,
        eId: Number,
        pos: Object,
        isMirrored: Boolean,
        type: Object,
        startModifyText: Function,
        resetClicks: Function,
    });

    let elementActive = false;
    let mirrored = ref(props.isMirrored);
    let self = ref(null);

    const emit = defineEmits(['deleteEvent', 'updateEvent', 'resizeEvent', 'mirrorEvent']);

    function updatePosition(eId) {
        props.resetClicks();
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
        this.mirrored = !this.mirrored;
        emit('mirrorEvent', {
            id: eId,
            mirror: this.mirrored,
        });
    }
    function ModifyText(eId) {
        if (elementActive) {
            let matchingIdEntry;
            elementsInCanvas.value.forEach((value, key) => {
                if (value.currentState().id === eId) matchingIdEntry = value;
            });
            if (!matchingIdEntry) {
                console.log('Error in id passing for ModifyText function [CanvasDraggableElement:76]');
                return;
            }
            props.startModifyText(true, matchingIdEntry);
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
            @mirror-event="updateMirroring(eId)"
            @delete-event="$emit('deleteEvent', eId)"
        />
        <div tabindex="-1" class="textContainer" v-if="type.getName() == 'Text'" @click="ModifyText(eId)">
            <p>
                {{ type.getContent() }}
            </p>
        </div>

        <img :src="url" :alt="altText" :class="{ mirror: mirrored }" v-if="type.getName() == 'Asset'" />
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

    p {
        width: 100%;
        height: 100%;
    }

    textarea {
        width: auto;
        height: auto;
        border: none;
        padding: 0;
        position: absolute;
        top: 0;
        left: 0;

        &:focus-visible {
            border: 1px solid red;
        }
    }

    .textContainer {
        width: 100%;
        height: 100%;
    }
</style>

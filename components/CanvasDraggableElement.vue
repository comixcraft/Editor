<script setup>
    import ElementDS from '../utils/Classes/Element.js';
    import { ref } from 'vue';

    const props = defineProps({
        z: Number,
        w: Number,
        h: Number,
        altText: String,
        url: String,
        eId: String,
        pos: Object,
        isMirrored: Boolean,
        type: Object,
        startModifyText: Function,
        resetClicks: Function,
    });

    let elementActive = false;
    let mirrored = ref(props.isMirrored);
    let self = ref(null);

    const emit = defineEmits([
        'deleteEvent',
        'updateEvent',
        'resizeEvent',
        'mirrorEvent',
        'modifyTextEvent',
        'resetClicksEvent',
    ]);

    function updatePosition(eId) {
        emit('resetClicksEvent');
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

    function deactivate() {
        elementActive = false;
        emit('resetClicksEvent');
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
        @deactivated="deactivate"
        @drag-stop="updatePosition(eId)"
        @resize-stop="resize(eId)"
    >
        <EditionMenu
            v-if="elementActive"
            @mirror-event="updateMirroring(eId)"
            @delete-event="$emit('deleteEvent', eId)"
        />
        <div
            tabindex="-1"
            class="textContent__container"
            v-if="type.getName() == 'Text'"
            @click="$emit('modifyTextEvent', { active: true, id: eId })"
        >
            <p class="textContent">
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

    .textContent__container {
        width: 100%;
        height: 100%;

        .textContent {
            width: 100%;
            height: 100%;
        }
    }
</style>

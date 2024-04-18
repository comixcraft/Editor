<script setup>
    import ElementDS from '../utils/Classes/Element.js'

    const props = defineProps({
        z: Number,
        w: Number,
        h: Number,
        altText: String,
        url: String,
        eId: Number,
        pos: Object,
        isMirrored: Boolean,
        type: Object
    })

    let elementActive = false;
    let mirrored = ref(props.isMirrored);
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

    function resize(eId) {
        // check what map entry correspond to id
        let matchingIdEntry;
        elementsInCanvas.value.forEach((value, key) => {
            if (value.currentState().id === eId) matchingIdEntry = value;
        })
        if (!matchingIdEntry) {
            console.log('Error in id passing for updatePosition function [CanvasDraggableElement:20]')
            return;
        }

        matchingIdEntry.setPos({x: self.value.left, y: self.value.top});
        matchingIdEntry.setWidth(self.value.width);
        matchingIdEntry.setHeight(self.value.height);
    }

    function updateMirroring(eId) {
        // mirror the image on editor
        this.mirrored = !this.mirrored;
        // recover the element
        let matchingIdEntry;
        elementsInCanvas.value.forEach((value, key) => {
            if (value.currentState().id === eId) matchingIdEntry = value;
        })
        if (!matchingIdEntry) {
            console.log('Error in id passing for updatePosition function [CanvasDraggableElement:20]')
            return;
        }
        // update isMirrored of element
        matchingIdEntry.setIsMirrored(this.mirrored);
    }
    
    function modifyText(eId) {
        // modify text of element
        let matchingIdEntry;
        elementsInCanvas.value.forEach((value, key) => {
            if (value.currentState().id === props.eId) matchingIdEntry = value;
        })
        if (!matchingIdEntry) {
            console.log('Error in id passing for updatePosition function [CanvasDraggableElement:20]')
            return;
        }
        let newText = prompt('Enter new text');
        matchingIdEntry.currentState().type.setContent(newText);
        console.log(matchingIdEntry.currentState());
    }
</script>

<template>
        <DraggableResizable
        :z="z"
        :w="w" 
        :h="h"
        :x="pos.currPos().x"
        :y="pos.currPos().y" 
        :eId="eId"
        :parent="true" 
        class-name-active="elementActive"
        :disableUserSelect="true"
        ref="self"
        @activated="function() {elementActive = !elementActive}"
        @deactivated="function() {elementActive = !elementActive}"
        @drag-stop="updatePosition(eId)"
        @resize-stop="resize(eId)">
            <EditionMenu 
            v-if="elementActive"
            @mirror-event="updateMirroring(eId)"
            @delete-event="$emit('deleteEvent', z)"
            />

            <p 
            v-if="type.getName() == 'Text'"
            @click="modifyText(eId)"
            >
                {{type.getContent()}}
            </p>
            
            <img :src="url" :alt="altText" :class="{mirror : mirrored}" v-if="type.getName() == 'Asset'">
        
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
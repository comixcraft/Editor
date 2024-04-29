<script setup>
    const props = defineProps({
        z: Number,
        w: Number,
        h: Number,
        altText: String,
        url: String,
        eId: String,
        pos: Object,
        isMirrored: Boolean,
        fontSize: Number, // if 0, it's an image, if not, it's text
        text: String,
        element: Object,
    });

    const comicStore = useComicStore();
    let elementActive = false;
    let mirrored = ref(props.isMirrored);
    let self = ref(null);
    let text = ref(props.text);
    let fontSize = ref(props.fontSize);

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
        this.mirrored = !this.mirrored;
        emit('mirrorEvent', {
            id: eId,
            mirror: this.mirrored,
        });
    }

    function deactivate() {
        elementActive = false;
    }

    onMounted(() => {
        comicStore.bus.on('updateText', (obj) => {
            if (obj.id == props.eId) {
                text.value = obj.text;
                fontSize.value = obj.fontSize;
            }
        });
    });
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
            class="text"
            :class="{ mirror: mirrored }"
            v-if="fontSize != 0"
            @dblclick="comicStore.setCurrentElement(props.element)"
        >
            <p class="text__content" :style="{ fontSize: fontSize + 'px' }">
                {{ text }}
            </p>
        </div>

        <img :src="url" :alt="altText" :class="{ mirror: mirrored }" v-if="fontSize == 0" />
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

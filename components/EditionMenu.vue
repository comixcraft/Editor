<script setup>
    const prop = defineProps({
        rotationAngle: Number,
        centerToAlign: Object,
    });

    const comicStore = useComicStore();
    let editionMenu = ref(null);
    let center = reactive({
        x: undefined,
        y: undefined,
    });

    onMounted(() => {
        center = prop.centerToAlign;
        comicStore.bus.on('updateCenter', (c) => {
            center = c.center;
            console.log(menuStyle.value);
        });
    });

    let menuStyle = computed(() => {
        return {
            top: `${center.y}px`,
        };
    });

    // let menuStyle = computed(() => {
    //     let right, top;
    //     if (prop.rotationAngle <= 90) {
    //         right = -85 * (1 - prop.rotationAngle / 90);
    //         top = -85 * (prop.rotationAngle / 90);
    //     } else if (prop.rotationAngle <= 180) {
    //         right = -85 * ((prop.rotationAngle - 90) / 90);
    //         top = -85 - 85 * ((prop.rotationAngle - 90) / 90);
    //     } else if (prop.rotationAngle <= 270) {
    //         right = -85 - 85 * ((prop.rotationAngle - 180) / 90);
    //         top = -170 + 85 * ((prop.rotationAngle - 180) / 90);
    //     } else {
    //         right = -170 + 85 * ((prop.rotationAngle - 270) / 90);
    //         top = 0 * ((prop.rotationAngle - 270) / 90);
    //     }

    //     return {
    //         right: `${right}px`,
    //         top: `${top}px`,
    //     };
    // });

    defineEmits(['deleteEvent', 'mirrorHorizontalEvent', 'mirrorVerticalEvent']);
</script>

<template>
    <div>
        <div class="icon-container" ref="editionMenu" :style="`top: ${center.y}`">
            <div class="edit-icon icon" @click="$emit('deleteEvent')">delete</div>
            <div class="edit-icon icon">flip_to_back</div>
            <div class="edit-icon icon">flip_to_front</div>
            <div class="edit-icon icon" @click="$emit('mirrorHorizontalEvent')">flip</div>
            <div class="edit-icon edit-icon:lastChild edit-icon--flipped icon" @click="$emit('mirrorVerticalEvent')">
                flip
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .icon-container {
        z-index: 99999;
        position: absolute;
        padding: $spacer-1 $spacer-1;
        display: grid;
        border: $border-width solid $light-grey-100;
        border-radius: $border-radius;
        background-color: $white;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: 1fr;
    }

    .edit-icon {
        padding: $spacer-1 $spacer-2;
        user-select: none;
        cursor: pointer;
        border-bottom: $border-width solid $light-grey-100;

        &:last-child {
            border-bottom: none;
        }

        &--flipped {
            transform: rotate(-90deg);
        }
    }
</style>

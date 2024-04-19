<script setup>
    let showMore = ref(false);
    defineProps({
        altText: String,
        url: String,
    });

    defineEmits(['deleteEvent', 'mirrorHorizontalEvent', 'mirrorVerticalEvent', 'rotateLeftEvent', 'rotateRightEvent']);
</script>

<template>
    <div>
        <div class="icon-container icon-container__top">
            <div class="edit-icon edit-icon__top icon" @click="$emit('deleteEvent')">delete</div>
            <div class="edit-icon edit-icon__top icon">flip_to_back</div>
            <div class="edit-icon edit-icon__top icon">flip_to_front</div>
            <div
                class="edit-icon edit-icon__top icon"
                :class="{ 'edit-icon--active': showMore }"
                @click="showMore = !showMore"
            >
                more_vert
            </div>
        </div>

        <div v-if="showMore" class="icon-container icon-container__right">
            <div class="edit-icon edit-icon__right icon" @click="$emit('rotateLeftEvent')">rotate_90_degrees_ccw</div>
            <div class="edit-icon edit-icon__right icon" @click="$emit('rotateRightEvent')">rotate_90_degrees_cw</div>
            <div class="edit-icon edit-icon__right icon" @click="$emit('mirrorHorizontalEvent')">flip</div>
            <div class="edit-icon edit-icon__right edit-icon--flipped icon" @click="$emit('mirrorVerticalEvent')">
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

        &__top {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 1fr;
            right: 0;
            top: -60px;
        }

        &__right {
            grid-template-rows: repeat(4, 1fr);
            grid-template-columns: 1fr;
            right: -65px;
        }
    }

    .edit-icon {
        padding: $spacer-1 $spacer-2;
        user-select: none;
        cursor: pointer;

        &__top {
            border-right: $border-width solid $light-grey-100;
        }

        &__right {
            border-bottom: $border-width solid $light-grey-100;
        }

        &:last-child {
            border-right: none;
            border-bottom: none;
        }

        &--flipped {
            transform: rotate(-90deg);
        }

        &--active {
            background-color: $light-grey-100;
        }
    }
</style>

<script setup>
    let showMore = ref(false);
    defineProps({
        altText: String,
        url: String,
    });

    defineEmits(['deleteEvent', 'mirrorHorizontalEvent', 'mirrorVerticalEvent']);
</script>

<template>
    <div>
        <div class="icon-container icon-container__top">
            <div class="edit-icon edit-icon__top icon" @click="$emit('deleteEvent')">delete</div>
            <div class="edit-icon edit-icon__top icon">flip_to_back</div>
            <div class="edit-icon edit-icon__top icon">flip_to_front</div>
            <div class="edit-icon edit-icon__top icon" @click="$emit('mirrorHorizontalEvent')">flip</div>
            <div
                class="edit-icon edit-icon__top edit-icon:lastChild edit-icon--flipped icon"
                @click="$emit('mirrorVerticalEvent')"
            >
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
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr;
        right: 0px;
        top: -85px;
    }

    .edit-icon {
        padding: $spacer-1 $spacer-2;
        user-select: none;
        cursor: pointer;

        &__top {
            border-right: $border-width solid $light-grey-100;
        }

        &:last-child {
            border-right: none;
            border-bottom: none;
        }

        &--flipped {
            transform: rotate(-90deg);
        }
    }
</style>

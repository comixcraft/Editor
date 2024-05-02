<script setup>
    defineEmits(['deleteEvent', 'mirrorHorizontalEvent', 'mirrorVerticalEvent', 'frontEvent', 'backEvent']);
</script>

<template>
    <div>
        <div class="icon-container">
            <div class="edit-icon icon" @click="$emit('deleteEvent')">delete</div>
            <div class="edit-icon icon" @click="$emit('frontEvent')">flip_to_front</div>
            <div class="edit-icon icon" @click="$emit('backEvent')">flip_to_back</div>
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
        top: 50%;
        transform: translateY(-50%);
        padding: $spacer-1 $spacer-1;
        display: grid;
        border: $border-width solid $light-grey-100;
        border-radius: $border-radius;
        background-color: $white;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: 1fr;
        pointer-events: auto;
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

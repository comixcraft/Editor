<script setup>
defineProps({
    altText: String,
    url: String,
});

defineEmits(['deleteEvent', 'mirrorEvent']);
</script>

<template>
    <div class="icon-container">
        <span class="edit-icon icon" @click="$emit('deleteEvent')">delete</span>
        <div class="edit-icon icon">flip_to_front</div>
        <div class="edit-icon icon">flip_to_back</div>
        <div class="edit-icon icon" @click="$emit('mirrorEvent')">flip</div>
        <div class="edit-icon icon">more_vert</div>
    </div>
</template>

<style lang="scss" scoped>
.icon-container {
    z-index: 99999;
    position: absolute;
    padding: $spacer-1 $spacer-1;
    top: -60px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    border: $border-width solid $light-grey-100;
    border-radius: $border-radius;
    background-color: $white;
}

.edit-icon {
    padding: $spacer-1 $spacer-2;
    border-right: $border-width solid $light-grey-100;

    &:last-child {
        border-right: none;
    }
}
</style>

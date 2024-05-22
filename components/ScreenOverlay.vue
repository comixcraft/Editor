<script setup>
    const props = defineProps({
        title: { type: String, default: '' },
        show: { type: Boolean, default: false },
    });

    defineEmits(['close']);
</script>

<template>
    <div v-if="show" class="overlay">
        <div class="navigation top-nav">
            <div class="navigation__title">{{ title }}</div>
            <button class="navigation__icon icon icon-btn" @click="$emit('close')">close</button>
        </div>
        <div class="overlay__content"><slot></slot></div>
    </div>
</template>

<style lang="scss" scoped>
    .navigation {
        display: flex;
        position: sticky;
        top: 0;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        color: $white;
    }

    .icon-btn {
        color: $white;
    }

    .overlay {
        height: 100dvh;
        width: 100vw;
        position: fixed;
        z-index: 999999;
        top: 0;
        left: 0;
        overflow-y: scroll;
        background-color: rgba($black-100, 0.3);
    }

    .overlay__content {
        width: 100%;
        height: 100%;
    }
</style>

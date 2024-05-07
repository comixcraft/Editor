<script setup>
    const props = defineProps({
        title: { type: String, default: '' },
        show: { type: Boolean, default: false },
    });

    defineEmits(['close']);
</script>

<template>
    <div v-if="show" class="overlay">
        <div class="navigation">
            <div class="navigation__title">{{ title }}</div>
            <button class="navigation__icon icon icon-btn" @click="$emit('close')">close</button>
        </div>
        <div class="overlay__content"><slot></slot></div>
    </div>
</template>

<style lang="scss" scoped>
    .navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        padding: $spacer-4 $spacer-3;
        color: $white;
        position: fixed;
        width: 100%;
    }

    .overlay {
        height: 100vh;
        position: fixed;
        z-index: 999999;
        top: 0;
        left: 0;
        overflow-y: scroll;
        background-color: $white;
    }

    .overlay__content {
        margin-top: $spacer-7;
    }

    .navigation__icon:hover {
        cursor: pointer;
    }
    .icon-btn {
        border: none;
        height: $spacer-6;
        width: $spacer-6;
        text-align: center;
        border-radius: $border-radius;
        vertical-align: middle;
        background-color: transparent;
        color: $white;
    }
</style>

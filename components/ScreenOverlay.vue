<template>
    <div v-if="show" class="overlay">
        <div class="navigation">
            <div class="navigation__title">{{ title }}</div>
            <button class="navigation__icon icon" @click="$emit('close')">close</button>
        </div>
        <div class="overlay__content"><slot></slot></div>
    </div>
</template>
<script setup>
    const props = defineProps({
        title: { type: String, default: '' },
        show: { type: Boolean, default: false },
    });

    defineEmits(['close']);
</script>
<style lang="scss" scoped>
    .navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        height: 80px;
        padding: 0 $spacer-5;
        color: white;
    }

    .overlay {
        height: 100vh;
        position: fixed;
        z-index: 999999;
        top: 0;
        left: 0;
    }

    .navigation__icon {
        border: none;
        height: 40px;
        width: 40px;
        text-align: center;
        border-radius: $border-radius;
        vertical-align: middle;
        background-color: transparent;
        color: white;
    }
    .navigation__icon:hover {
        cursor: pointer;
    }
</style>

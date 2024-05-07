<script setup>
    import iconConfig from '../config/iconsConfig';

    const props = defineProps({
        iconName: { type: String, default: '' },
        title: { type: String },
        show: { type: Boolean, default: false },
    });

    const emit = defineEmits(['close']);
</script>

<template>
    <div>
        <div v-if="show" class="background"></div>
        <div v-if="show" class="overlay">
            <div class="navigation__icon icon" @click="$emit('close')">close</div>
            <div class="overlay__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .background {
        position: absolute;
        top: 0;
        background-color: $black-100;
        height: 100vh;
        width: 100%;
        opacity: 40%;
    }

    .overlay {
        z-index: 9999999;
        padding: $spacer-3;
        background-color: $white;
        border-top-left-radius: $border-radius-xl;
        border-top-right-radius: $border-radius-xl;
        height: calc(100vh - $spacer-8);
        width: 100vw;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
    }

    .icon {
        color: $grey-70;
    }

    .navigation__icon {
        position: absolute;
        right: $spacer-4;
    }
</style>

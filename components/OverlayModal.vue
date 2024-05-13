<script setup>
    const props = defineProps({
        show: { type: Boolean, default: false },
        full: Boolean,
    });

    const height = computed(() => {
        if (props.full) {
            return `100vh`;
        } else {
            return 'fit-content';
        }
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
        z-index: 2;
        position: absolute;
        top: 0;
        background-color: $black-100;
        height: 100vh;
        width: 100%;
        opacity: 30%;
    }

    .overlay {
        z-index: 9999999;
        padding: $spacer-3;
        background-color: $white;
        border-top-left-radius: $border-radius-xl;
        border-top-right-radius: $border-radius-xl;
        max-height: calc(v-bind(height) - $spacer-8);
        width: 100%;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        display: flex;
        flex-direction: column;

        &__title {
            display: flex;
            gap: $spacer-2;
        }

        &__content {
            overflow-y: auto;
        }
    }

    .close-icon {
        color: $grey-70;
    }

    .navigation__icon {
        position: absolute;
        right: $spacer-4;
    }
</style>

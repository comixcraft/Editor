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
    <div v-if="show" class="background">
        <div class="overlay">
            <div class="close-icon icon" @click="$emit('close')">close</div>
            <div class="overlay__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .background {
        z-index: 9999999;
        position: absolute;
        top: 0;
        background-color: rgba($black-100, 0.3);
        height: 100vh;
        width: 100vw;

        @include media-breakpoint-up(lg) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .overlay {
        padding: $spacer-3;
        background-color: $white;
        border-radius: $border-radius-xl $border-radius-xl 0 0;
        max-height: calc(v-bind(height) - $spacer-8);
        width: 100%;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        display: flex;
        flex-direction: column;

        @include media-breakpoint-up(lg) {
            padding: $spacer-5 $spacer-5 $spacer-8 $spacer-5;
            position: relative;
            width: 50%;
            border-radius: $border-radius-xl;
        }

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
        position: absolute;
        right: $spacer-4;
        cursor: pointer;

        @include media-breakpoint-up(lg) {
            right: $spacer-5;
        }
    }
</style>

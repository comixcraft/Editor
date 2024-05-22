<script setup>
    const props = defineProps({
        show: { type: Boolean, default: false },
        full: Boolean,
        padding: { type: String, default: '16px' },
    });

    const height = computed(() => {
        if (props.full) {
            return `100svh`;
        } else {
            return 'fit-content';
        }
    });

    const emit = defineEmits(['close']);
</script>

<template>
    <div v-if="show" class="background">
        <div class="overlay" :style="{ padding: padding }">
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
        height: 100dvh;
        width: 100vw;

        @include media-breakpoint-up(lg) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .overlay {
        background-color: $white;
        border-radius: $border-radius-xl $border-radius-xl 0 0;
        max-height: calc(v-bind(height) - $spacer-8);
        width: 100%;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;

        @include media-breakpoint-up(lg) {
            padding: $spacer-5 $spacer-5 $spacer-8 $spacer-5;
            position: relative;
            width: 75%;
            border-radius: $border-radius-xl;
        }

        @include media-breakpoint-up(xl) {
            width: 50%;
        }

        &__title {
            display: flex;
            gap: $spacer-2;
        }

        &__content {
            overflow-y: auto;
            margin-top: $spacer-3;
        }
    }

    .close-icon {
        color: $grey-70;
        z-index: 9999;
        position: absolute;
        right: $spacer-4;
        top: $spacer-3;
        cursor: pointer;

        @include media-breakpoint-up(lg) {
            right: $spacer-5;
        }
    }
</style>

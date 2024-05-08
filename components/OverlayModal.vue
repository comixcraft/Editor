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
        <div v-if="show" class="overlay">
            <div class="overlay-container">
                <div class="overlay__title">
                    <span class="edit-icon icon text-primary">
                        {{ iconConfig.get(props.title) || 'default_icon' }}
                    </span>
                    <div class="navigation__title h1">
                        {{ title }}
                    </div>
                </div>
                <div class="close-icon icon" @click="$emit('close')">close</div>
            </div>
            <div class="overlay__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .overlay-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $primary;
        cursor: pointer;
        background-color: $white;
    }

    .overlay {
        z-index: 9999999;
        padding: $spacer-3;
        background-color: $white;
        border-top-left-radius: $border-radius-xl;
        border-top-right-radius: $border-radius-xl;
        height: calc(100vh - 10px);
        width: 100vw;
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
</style>

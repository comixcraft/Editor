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
            <div class="navigation">
                <div class="category__description">
                    <span class="edit-icon icon text-primary">
                        {{ iconConfig.get(props.iconName) || 'default_icon' }}
                    </span>
                    <div class="navigation__title h1">
                        {{ title }}
                    </div>
                </div>
                <div class="navigation__icon icon" @click="$emit('close')">close</div>
            </div>
            <div class="overlay__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $white;
        height: 80px;
        margin: 0;
        color: $primary;
        cursor: pointer;
    }
    .category__description {
        display: flex;
        gap: $spacer-2;
    }
    .overlay {
        z-index: 9999999;
        position: fixed;
        top: 5.6%;
        bottom: 0;
        right: 0;
        left: 0;
        padding: $spacer-3;
        border-top-left-radius: $border-radius-xl;
        border-top-right-radius: $border-radius-xl;
        background-color: $white;
    }

    .icon {
        color: $grey-70;
    }
</style>

<template>
    <div>
        <div v-if="show" class="overlay">
            <div class="navigation">
                <div class="category__description">
                    <span class="edit-icon icon text-primary">{{ iconName }}</span>
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

<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        iconName: { type: String, default: '' },
        title: { type: String, default: '' },
        show: { type: Boolean, default: false },
    });

    const emit = defineEmits(['close']);
</script>

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
        gap: 10px;
    }
    .overlay {
        position: fixed;
        top: 5.6%;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 16px;
        border-top-left-radius: $border-radius-xl;
        border-top-right-radius: $border-radius-xl;
        background-color: $white;
    }

    .icon {
        color: $grey-70;
    }
</style>

<script setup>
    const props = defineProps({
        show: { type: Boolean, default: false },
        buttons: { type: Array, default: () => [] },
    });

    const emit = defineEmits(['close', 'buttonClick']);

    function handleButtonClick(button) {
        emit('buttonClick', button);
    }
</script>

<template>
    <div v-if="show" class="sub__overlay">
        <div class="sub__navigation">
            <button v-for="(button, index) in buttons" :key="index" @click="handleButtonClick(button)">
                {{ button.label }}
            </button>
        </div>
        <div class="sub_overlay__content"><slot></slot></div>
    </div>
</template>

<style lang="scss" scoped>
    .sub__overlay {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 16px;
        background-color: $white;
        box-shadow: 0 3px 10px $grey-60;
    }

    .sub__navigation {
        display: flex;
        justify-content: space-between;
        box-shadow: 3px;
    }

    button {
        background: $white;
        border: none;
        border-radius: $border-radius;
        padding: 10px;
    }

    button:hover {
        background-color: $primary;
        color: white;
    }
</style>

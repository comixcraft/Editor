<script setup>
    // Imports

    // Middlewares

    // Emits

    // Props
    const props = defineProps({
        loading: {
            type: Boolean,
            default: false,
        },
    });

    // Static Variables (let, const)

    // Reactive Variables
    // computed

    // Reactive

    // Refs

    // Watchers

    // Methods

    // Bus Listeners

    // Vue life cycle hooks

    // expose (defineExpose)
</script>

<template>
    <div>
        <div class="loader" v-if="loading"></div>
    </div>
</template>

<style scoped lang="scss">
    .loader {
        width: 50px;
        aspect-ratio: 1;
        border-radius: 50%;
        background:
            radial-gradient(farthest-side, $secondary-100 94%, #0000) top/8px 8px no-repeat,
            conic-gradient(#0000 30%, $secondary-100);
        -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
        animation: rotate360 1s infinite linear;
    }

    @keyframes rotate360 {
        100% {
            transform: rotate(1turn);
        }
    }
</style>

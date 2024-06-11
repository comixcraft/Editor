<script setup>
    defineProps({
        altText: String,
        url: String,
    });
</script>

<template>
    <div class="card">
        <img :alt="altText" :src="url" loading="lazy" draggable="false" />
    </div>
</template>

<style lang="scss" scoped>
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: $spacer-2;
        border: 1px solid $grey-0;

        &:hover {
            @include media-breakpoint-up(lg) {
                cursor: pointer;
                background-color: $grey-40;
                border-radius: $border-radius;
                border: 1px solid $grey-50;
            }
        }
    }

    .card > img {
        height: 100px;
        width: 100px;
        object-fit: contain;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-select: none;
    }
</style>

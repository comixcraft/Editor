<script setup>

    defineProps({
        w: Number,
        h: Number,
        altText: String,
        url: String,
    })

</script>

<template>
        <DraggableResizable :w="w" :h="h" :parent="true">
            <img :src="url" :alt="altText">
        </DraggableResizable>
</template>

<style scoped>

    img {
        width: 100%;
        height: 100%;
    }

</style>
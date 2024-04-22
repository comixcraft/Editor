<script setup>
    const props = defineProps({
        comic: {
            type: Object,
            default: () => {},
        },
    });

    const stripHeight = ref(0);

    stripHeight.value = props.comic.getPage(0).getStrip(0).height;
</script>

<template>
    <swiper>
        <swiper-slide v-for="(panel, index) in comic.getPage(0).getStrip(0).panels" :key="index">
            <WrapperCanvas :height="stripHeight" :panel="panel"></WrapperCanvas>
        </swiper-slide>
    </swiper>
</template>

<style scoped lang="scss">
    .swiper {
        width: 70vw;
        height: 100%;
    }

    .swiper-slide {
        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

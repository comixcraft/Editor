<script setup>
    const emit = defineEmits(['active-panel-change']);

    const props = defineProps({
        comic: {
            type: Object,
            default: () => {},
        },
    });

    const stripHeight = ref(0);
    const activePanelIndex = ref(0);
    const comicStore = useComicStore();

    function updateActivePanel(index) {
        activePanelIndex.value = index;
        emit('active-panel-change', index);
    }

    stripHeight.value = props.comic.getPage(0).getStrip(0).height;
</script>

<template>
    <swiper
        :initial-slide="activePanelIndex"
        @active-index-change="updateActivePanel($event.activeIndex)"
        class="comic-swiper"
        :modules="[SwiperPagination]"
        :prevent-clicks="false"
        :prevent-clicks-propagation="false"
        :touch-start-prevent-default="false"
        :resistance="false"
        :pagination="{
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class='${className}'>${index}</span>`;
            },
        }"
    >
        <TextEditor v-if="comicStore.getCurrentElement().value != null" />
        <swiper-slide v-for="(panel, index) in comic.getPage(0).getStrip(0).panels" :key="index">
            <div class="d-flex justify-content-center align-items-center">
                <WrapperCanvas
                    class="swiper-no-swiping wrapper-canvas"
                    :height="stripHeight"
                    :panel="panel"
                ></WrapperCanvas>
            </div>
        </swiper-slide>
    </swiper>
</template>

<style scoped lang="scss">
    .swiper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .comic-swiper__swipe-area {
        width: 100%;
        margin: $spacer-3 0;

        @include media-breakpoint-up(lg) {
            margin: $spacer-7 0;
        }
    }
</style>

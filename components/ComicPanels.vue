<script setup>
    const emit = defineEmits(['active-panel-change']);

    const props = defineProps({
        comic: {
            type: Object,
            default: () => {},
        },
        selectedId: {
            type: String,
            default: () => null,
        },
        lockAspectRatio: Boolean,
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
    <div>
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
                <WrapperCanvas
                    class="swiper-no-swiping"
                    :lockAspectRatio="props.lockAspectRatio"
                    :height="stripHeight"
                    :panel="panel"
                    :comic="props.comic"
                    :selectedId="props.selectedId"
                ></WrapperCanvas>
                <div class="comic-swiper__swipe-area"></div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped lang="scss">
    .swiper {
        width: 55vw;
        height: 100%;
    }

    .swiper-slide {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .comic-swiper__swipe-area {
        width: 100%;
        margin: $spacer-3;

        @include media-breakpoint-up(lg) {
            margin: $spacer-7;
        }
    }
</style>

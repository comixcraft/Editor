<script setup>
    const emit = defineEmits(['active-panel-change']);

    const props = defineProps({
        comic: {
            type: Object,
            default: () => {},
        },
        lockAspectRatio: Boolean,
        refreshCount: Number,
    });

    const activePanelIndex = ref(0);
    const comicStore = useComicStore();

    function updateActivePanel(index) {
        activePanelIndex.value = index;
        emit('active-panel-change', index);
    }
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
                return `<span class='${className}'>${index + 1}</span>`;
            },
        }"
    >
        <TextEditor v-if="comicStore.getCurrentElement().value != null" />
        <swiper-slide v-for="(panel, index) in comic.getPage(0).getStrip(0).panels" :key="index">
            <WrapperCanvas
                :panel="panel"
                :refreshCount="props.refreshCount"
                :panelIsActive="panel === comic.getPage(0).getStrip(0).panels[activePanelIndex]"
            ></WrapperCanvas>
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
        padding-bottom: $spacer-5;

        @include media-breakpoint-up(lg) {
            padding-bottom: $spacer-11;
        }
    }
</style>

<script setup>
    const emit = defineEmits(['active-panel-change']);

    const props = defineProps({
        comic: {
            type: Object,
            default: () => {},
        },
        lockAspectRatio: Boolean,
    });
    const activePanelIndex = ref(0);
    const comicStore = useComicStore();
    const panelBBArray = reactive([]);
    props.comic
        .getPage(0)
        .getStrip(0)
        .panels.forEach((panel, index) => {
            panelBBArray.push({ height: props.comic.getPage(0).getStrip(0).height, width: panel.width });
        });
    let DOMElementArray;

    onMounted(() => {
        DOMElementArray = Array.from(document.getElementsByClassName('swiper-no-swiping'));
        updatePanelBB();
    });

    window.onresize = updatePanelBB;

    function updatePanelBB() {
        if (panelBBArray.length !== DOMElementArray.length) return;
        DOMElementArray.forEach((DOMElement, index) => {
            panelBBArray[index].height = DOMElement.getBoundingClientRect().height;
            panelBBArray[index].width = DOMElement.getBoundingClientRect().width;
        });
    }

    function updateActivePanel(index) {
        activePanelIndex.value = index;
        emit('active-panel-change', index);
    }
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
                    :height="props.comic.getPage(0).getStrip(0).height"
                    :panel="panel"
                    :panelIsActive="panel === comic.getPage(0).getStrip(0).panels[activePanelIndex]"
                    :comic="props.comic"
                    :panelIndex="index"
                    :arrayBB="panelBBArray"
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

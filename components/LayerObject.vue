<script setup>
    import Sortable from 'sortablejs';

    const comicStore = useComicStore();
    const props = defineProps({
        panel: Object,
    });

    const emit = defineEmits(['selectionEvent']);

    let ul;
    let selection = ref(undefined);

    // create a reactive array from map element
    let arrayZ = ref(Array.from(props.panel.elements, ([key, value]) => value));

    // sort Array with z-index
    const arrayZSorted = computed(() => {
        return arrayZ.value.slice().sort((a, b) => a.z - b.z);
    });

    onMounted(() => {
        ul = document.getElementsByClassName('layers')[0];
        // let sortable = Sortable.create(ul, {
        //     animation: 150,
        //     ghostClass: 'left-over',
        //     onEnd: function (evt) {
        //         emit('switchEvent', {
        //             eId1: arrayZSorted.value[evt.oldIndex].id,
        //             eId2: arrayZSorted.value[evt.newIndex].id,
        //         });
        //     },
        // });
    });

    onBeforeUnmount(() => {
        comicStore.bus.off('elementMoved');
    });

    comicStore.bus.on('elementMoved', () => {
        updateArrayZ();
    });

    function sendEmitBack(eId, index) {
        updateArrayZ();
        selection.value = index;
        comicStore.bus.emit('putLayerBack', eId);
    }

    function sendEmitFront(eId, index) {
        updateArrayZ();
        selection.value = index;
        comicStore.bus.emit('putLayerFront', eId);
    }

    function updateArrayZ() {
        arrayZ.value = Array.from(Array.from(props.panel.elements, ([key, value]) => value));
    }

    function selectLayer(eId, index) {
        selection.value === index ? (selection.value = undefined) : (selection.value = index);
        emit('selectionEvent', eId);
    }
</script>

<template>
    <ul class="layers">
        <li
            v-for="(element, index) in arrayZSorted"
            :key="element.id"
            class="layer"
            :accessKey="element.id"
            @click="selectLayer(element.id, index)"
            :style="{ border: index === selection ? '1px solid black' : 'none' }"
        >
            <div class="asset-image">
                <img class="img" :src="element.src" :alt="element.alt" />
            </div>
            <p class="layer-text">{{ element.alt }}</p>
            <div class="chevrons">
                <div
                    class="expand-less icon"
                    :style="{ opacity: index > 0 ? 1 : 0.25, cursor: index > 0 ? 'pointer' : 'not-allowed' }"
                    @click="sendEmitBack(element.id, index)"
                >
                    expand_less
                </div>
                <div
                    class="expand-more icon"
                    :style="{
                        opacity: index < arrayZSorted.length - 1 ? 1 : 0.25,
                        cursor: index < arrayZSorted.length - 1 ? 'pointer' : 'not-allowed',
                    }"
                    @click="sendEmitFront(element.id, index)"
                >
                    expand_more
                </div>
            </div>
        </li>
    </ul>
</template>

<style scoped lang="scss">
    .layer {
        padding: $spacer-3;
        width: 90vw;
        background-color: #ccc;
        margin-top: $spacer-4;
        display: flex;
        align-items: center;
    }

    .asset-image {
        width: 60px;
        height: 60px;
        background-color: white;
        margin-right: 10px; /* Adjust margin between images as needed */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .asset-image > .img {
        max-height: 90%;
        max-width: 90%;
    }

    .layer-content {
        display: flex;
        align-items: center;
    }

    .chevrons {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        & :hover {
            cursor: pointer;
        }
    }

    .layer-text {
        margin: 0;
    }
</style>

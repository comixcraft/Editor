<script setup>
    import Sortable from 'sortablejs';

    const comicStore = useComicStore();
    const props = defineProps({
        panel: Object,
    });

    const emit = defineEmits(['selectionEvent']);

    let ul;
    let selection = ref(undefined);
    let navHeight = ref(0);
    let navHeightPx = computed(() => {
        return navHeight.value + 'px';
    });

    // create a reactive array from map element
    let arrayZ = ref(Array.from(props.panel.elements, ([key, value]) => value));

    // sort Array with z-index
    const arrayZSorted = computed(() => {
        return arrayZ.value.slice().sort((a, b) => b.z - a.z);
    });

    onMounted(() => {
        ul = document.getElementsByClassName('layers')[0];
        navHeight.value = ul.parentNode.parentNode.parentNode.parentNode.firstChild.getBoundingClientRect().height;
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

    function sendEmitBack(eId, index) {
        updateArrayZ();
        //selection.value = index;
        comicStore.bus.emit('putLayerBack', eId);
    }

    function sendEmitFront(eId, index) {
        updateArrayZ();
        //selection.value = index;
        comicStore.bus.emit('putLayerFront', eId);
    }

    function updateArrayZ() {
        arrayZ.value = Array.from(Array.from(props.panel.elements, ([key, value]) => value));
    }

    function selectLayer(eId, index) {
        //selection.value === index ? (selection.value = undefined) : (selection.value = index);
        emit('selectionEvent', eId);
    }
</script>

<template>
    <div class="empty-display" v-if="arrayZ.length === 0">
        <img src="/public/Barista explaining6.png" alt="" class="empty-display__img" />
        <div class="empty-display_text">
            <h1>No layers to display</h1>
            <p>Start by adding an asset to the canvas.</p>
        </div>
    </div>
    <ul class="layers" :style="{ 'margin-top': navHeightPx }">
        <li
            v-for="(element, index) in arrayZSorted"
            :key="element.id"
            class="layer"
            :accessKey="element.id"
            @click="selectLayer(element.id, index)"
            :class="{ 'selected-layer': index === selection }"
        >
            <div class="asset-image">
                <img
                    class="img"
                    :src="element.type.path"
                    :alt="element.type.name === 'Asset' ? element.alt : 'Text icon'"
                />
            </div>
            <p class="layer-text">{{ element.type.name === 'Asset' ? element.alt : element.type.content }}</p>
            <div class="chevrons">
                <button
                    class="expand-less icon icon-btn"
                    :class="{ disabled: index === 0 }"
                    @click="sendEmitFront(element.id, index)"
                >
                    expand_less
                </button>
                <button
                    class="expand-more icon icon-btn"
                    :class="{ disabled: index === arrayZSorted.length - 1 }"
                    @click="sendEmitBack(element.id, index)"
                >
                    expand_more
                </button>
            </div>
        </li>
    </ul>
</template>

<style scoped lang="scss">
    .chevrons button.disabled {
        color: $grey-60;
        cursor: not-allowed;
    }

    .empty-display {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: column;
        row-gap: $spacer-5;
        margin-top: $spacer-9;
        align-items: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .empty-display__img {
        z-index: 10;
        max-width: 8rem !important;
    }

    .empty-display h1 {
        color: $primary;
    }

    .empty-display_text {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        row-gap: $spacer-4;
    }

    .layer {
        padding: $spacer-3;
        width: 90vw;
        border: $primary $border-width solid;
        border-radius: $border-radius;
        margin-top: $spacer-4;
        display: flex;
        align-items: center;
    }

    .layer.selected-layer {
        border-width: $border-width-lg solid $primary;
    }

    ul {
        padding-inline-start: 0;
    }

    .asset-image {
        width: $spacer-8;
        height: $spacer-8;
        background-color: $white;
        margin-right: $spacer-2;
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

    .btn-icon {
        color: $black;
    }
</style>

<script setup>
    import Sortable from 'sortablejs';

    const ul = ref(null);

    const comicStore = useComicStore();
    const props = defineProps({
        panel: Object,
    });

    const emit = defineEmits(['selectionEvent']);

    let selection = ref(undefined);

    // create a reactive array from map element
    let arrayZ = ref(Array.from(props.panel.elements, ([key, value]) => value));
    let tempArray = arrayZ;

    // sort Array with z-index
    const arrayZSorted = computed(() => {
        return arrayZ.value.slice().sort((a, b) => b.z - a.z);
    });

    onMounted(() => {
        let sortable = Sortable.create(ul.value, {
            animation: 150,
            ghostClass: 'layer-ghost',
            chosenClass: 'layer-chosen',
            onStart: function (evt) {},
            onEnd: function (evt) {
                tempArray.value = [...ul.value.children].map((layer) => props.panel.getElement(layer.accessKey));
                const fixedCopy = [];
                arrayZSorted.value.forEach((el) => {
                    fixedCopy.push(el.z);
                });
                tempArray.value.forEach((el, index) => {
                    el.z = fixedCopy[index];
                });
                updateArrayZ();
                props.panel.addAlteration();
            },
        });
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
        <img src="/public/Barista explaining6.png" alt="" class="empty-display__img" draggable="false" />
        <div class="empty-display__text">
            <h1>No layers to display</h1>
            <p>Start by adding an asset to the canvas.</p>
        </div>
    </div>
    <ul class="layer-list" ref="ul">
        <li
            v-for="(element, index) in arrayZSorted"
            :key="element.id"
            class="layer"
            :accessKey="element.id"
            @click="selectLayer(element.id, index)"
            :class="{ 'layer--selected': index === selection }"
        >
            <img
                draggable="false"
                class="layer__image"
                :src="element.type.path"
                :alt="element.type.name === 'Asset' ? element.alt : 'Text icon'"
            />
            <p class="m-0">{{ element.type.name === 'Asset' ? element.alt : element.type.content }}</p>
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

        &__img {
            z-index: 10;
            max-width: 8rem !important;
        }

        & h1 {
            color: $primary;
        }

        &__text {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            row-gap: $spacer-4;
        }
    }

    .layer {
        padding: $spacer-3;
        width: 80vw;
        background-color: $white-100;
        border: $primary $border-width solid;
        border-radius: $border-radius;
        display: flex;
        align-items: center;

        @include media-breakpoint-up(lg) {
            width: 90vw;
        }

        &:hover {
            cursor: move;
        }

        &--selected {
            border-width: $border-width-lg solid $primary;
        }

        &__image {
            width: $spacer-8;
            height: $spacer-8;
            background-color: $white;
            margin-right: $spacer-3;
            object-fit: contain;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-select: none;
        }

        &-ghost {
            background-color: $primary-50;
            border: none;
        }
    }

    .layer-list {
        padding-inline-start: 0;
        display: flex;
        gap: $spacer-4;
        flex-direction: column;
    }

    .chevrons {
        display: flex;
        flex-direction: column;
        margin-left: auto;

        &:hover {
            cursor: pointer;
        }

        .expand-less:hover,
        .expand-more:hover {
            scale: 1.2;
        }

        button.disabled {
            color: $grey-60;
            cursor: not-allowed;
            scale: 1;
        }
    }
</style>

<script setup>
    import ElementDS from '~/utils/Classes/Element';
    import Text from '~/utils/Classes/Text';
    import Asset from '~/utils/Classes/Asset';

    const props = defineProps({
        panel: Object,
        panelIsActive: Boolean,
        lockAspectRatio: Boolean,
        refreshCount: Number,
    });

    const aspectRatioWidth = parseFloat(props.panel.width / props.panel.width);
    const aspectRatioHeight = parseFloat(props.panel.height / props.panel.width);

    const comicStore = useComicStore();
    const elements = props.panel.elements;
    const panelElement = ref(null);
    const wrapperCanvas = ref(null);
    const scaleByHeight = ref(false);
    const panelBorder = ref(`url(${props.panel.border})`);
    const currentHeight = ref(1);
    const currentWidth = ref(1);
    const activeElementId = ref(null);
    const isDragging = ref(false);
    let resizing = ref(false);

    let resizeTimeout;

    function setActiveElement(eId) {
        if (!isDragging.value) {
            activeElementId.value = eId;
        }
    }

    function setToRelative(num, panelNum) {
        return num / panelNum;
    }

    function getFixed(num, panelNum) {
        return num * panelNum;
    }

    function updatePanelBoundingBox() {
        scaleByHeight.value =
            wrapperCanvas.value.clientWidth / wrapperCanvas.value.clientHeight > aspectRatioWidth / aspectRatioHeight;
        currentWidth.value = panelElement.value.clientWidth;
        currentHeight.value = panelElement.value.clientHeight;
    }

    function deleteElement(eId) {
        // delete last element of map
        props.panel.deleteElement(eId);
    }

    function resizeElement(obj) {
        // update element width and height
        elements.get(obj.eId).pos = {
            x: setToRelative(obj.pos.x, currentWidth.value),
            y: setToRelative(obj.pos.y, currentHeight.value),
        };
        elements.get(obj.eId).width = setToRelative(obj.width, currentWidth.value);
        elements.get(obj.eId).height = setToRelative(obj.height, currentHeight.value);
        props.panel.addAlteration();
    }

    function updatePosition(obj) {
        // update element position
        elements.get(obj.eId).pos = {
            x: setToRelative(obj.pos.x, currentWidth.value),
            y: setToRelative(obj.pos.y, currentHeight.value),
        };
        props.panel.addAlteration();
    }

    function updateMirrorValues(obj) {
        // update element mirror values
        if (obj.direction === 'x') {
            elements.get(obj.eId).isMirroredHorizontal = obj.isMirrored;
            return;
        }
        elements.get(obj.eId).isMirroredVertical = obj.isMirrored;
        props.panel.addAlteration();
    }

    function updateRotation(obj) {
        // update element rotation
        elements.get(obj.eId).rotation = obj.rotation;
        props.panel.addAlteration();
    }

    // Bus listeners
    comicStore.bus.on('putLayerBack', (eId) => {
        downElement(eId);
    });

    comicStore.bus.on('putLayerFront', (eId) => {
        upElement(eId);
    });

    comicStore.bus.on('add-element', (event) => {
        if (!props.panelIsActive) return;

        let tempEl;
        if (event) {
            let height = 0;
            let width = 0;

            if (event.target.naturalWidth > event.target.naturalHeight) {
                width = 0.2;
                height = setToRelative(
                    (getFixed(width, currentWidth.value) * event.target.naturalHeight) / event.target.naturalWidth,
                    currentHeight.value
                );
            } else {
                height = 0.2;
                width = setToRelative(
                    (getFixed(height, currentHeight.value) * event.target.naturalWidth) / event.target.naturalHeight,
                    currentWidth.value
                );
            }

            let name = event.target.alt;
            let src = event.target.src;
            let newAsset = new Asset(src);
            tempEl = new ElementDS(width, height, name, newAsset);
        } else {
            const height = setToRelative(200, currentHeight.value);
            const width = setToRelative(200, currentWidth.value);
            let name = 'Double-click to edit me.';
            let type = new Text(name, 24, 'Pangolin');
            tempEl = new ElementDS(width, height, name, type);
        }
        props.panel.addElement(tempEl);
    });

    // functions
    function upElement(eId) {
        if (!props.panelIsActive) return;
        props.panel.moveZIndexUp(eId);
        props.panel.addAlteration();
    }

    function downElement(eId) {
        if (!props.panelIsActive) return;
        props.panel.moveZIndexDown(eId);
        props.panel.addAlteration();
    }

    function delayUpdatePanelBoundingBox() {
        resizing.value = true;
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updatePanelBoundingBox();
            resizing.value = false;
        }, 300);
    }

    onMounted(() => {
        window.addEventListener('resize', delayUpdatePanelBoundingBox);

        updatePanelBoundingBox();
    });

    //could add addAlteration method here in the future?
    onUpdated(() => {
        updatePanelBoundingBox();
    });

    onBeforeUnmount(() => {
        comicStore.bus.off('add-element');
        comicStore.bus.off('putLayerBack');
        comicStore.bus.off('putLayerFront');
        window.removeEventListener('resize', delayUpdatePanelBoundingBox);
    });
</script>

<template>
    <div class="wrapper-canvas" ref="wrapperCanvas">
        <div
            :key="props.refreshCount"
            ref="panelElement"
            class="panel swiper-no-swiping"
            :class="scaleByHeight ? 'panel--scale-by-height' : 'panel--scale-by-width'"
        >
            <div class="w-100 h-100" v-if="!resizing">
                <DragResizeRotate
                    v-for="[key, value] in elements"
                    :key="key"
                    :altText="value.alt"
                    :eId="value.id"
                    :h="getFixed(value.height, currentHeight)"
                    :isMirroredHorizontal="value.isMirroredHorizontal"
                    :isMirroredVertical="value.isMirroredVertical"
                    :rotation="value.rotation"
                    :pos="value.pos"
                    :url="value.type.path"
                    :x="getFixed(value.pos.x, currentWidth)"
                    :y="getFixed(value.pos.y, currentHeight)"
                    :w="getFixed(value.width, currentWidth)"
                    :z="value.z"
                    :fontSize="value.type.name == 'Text' ? value.type.fontSize : 0"
                    :text="value.type.content == undefined ? '' : value.type.content"
                    :selectedId="props.selectedId"
                    :lockAspectRatio="props.lockAspectRatio"
                    :element="value"
                    :active="activeElementId == value.id"
                    @delete-event="deleteElement"
                    @update-event="updatePosition"
                    @resize-event="resizeElement"
                    @mirror-horizontal-event="updateMirrorValues"
                    @mirror-vertical-event="updateMirrorValues"
                    @rotate-event="updateRotation"
                    @front-event="upElement"
                    @back-event="downElement"
                    @dragging="isDragging = true"
                    @dragstop="isDragging = false"
                    @activated="setActiveElement(value.id)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .wrapper-canvas {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .panel {
        aspect-ratio: v-bind(aspectRatioWidth) / v-bind(aspectRatioHeight);
        position: relative;
        background-image: v-bind(panelBorder);
        background-size: cover;

        &--scale-by-height {
            width: auto !important;
            height: 85% !important;
        }

        &--scale-by-width {
            width: 85% !important;
            height: auto !important;
        }
    }
</style>

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
    const ddrContainer = ref(null);
    const scaleByHeight = ref(false);
    const panelBorder = ref(`url(${props.panel.border})`);
    const currentHeight = ref(0);
    const currentWidth = ref(0);
    const activeElementId = ref(null);
    const isDragging = ref(false);

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

    function calculateRelativeLengthB(
        relativeLengthA,
        naturalLengthA,
        maxAbsoluteLengthA,
        naturalLengthB,
        maxAbsoluteLengthB
    ) {
        return setToRelative(
            (getFixed(relativeLengthA, maxAbsoluteLengthA) * naturalLengthB) / naturalLengthA,
            maxAbsoluteLengthB
        );
    }

    function updatePanelBoundingBox() {
        scaleByHeight.value =
            wrapperCanvas.value.clientWidth / wrapperCanvas.value.clientHeight > aspectRatioWidth / aspectRatioHeight;
        currentWidth.value = panelElement.value.clientWidth;
        currentHeight.value = panelElement.value.clientHeight;
        if (props.panelIsActive) {
            comicStore.setCurrentCanvas({
                width: currentWidth.value,
                height: currentHeight.value,
            });
        }
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
        const element = elements.get(obj.eId);
        const newPos = {
            x: setToRelative(obj.pos.x, currentWidth.value),
            y: setToRelative(obj.pos.y, currentHeight.value),
        };

        // Check if the new position is different from the current position
        if (element.pos.x !== newPos.x || element.pos.y !== newPos.y) {
            element.pos = newPos;
            props.panel.addAlteration();
        }
    }

    function updateMirrorValues(obj) {
        // update element mirror values
        const element = elements.get(obj.eId);
        if (!element) return;

        if (obj.direction === 'x') {
            element.isMirroredHorizontal = obj.isMirrored;
        } else {
            element.isMirroredVertical = obj.isMirrored;
        }

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

        let elementType = null;
        let height = 0;
        let width = 0;
        let name = '';

        if (event) {
            let percentageFill = 0.3;
            let target;
            if (event.target.tagName !== 'IMG') {
                target = event.target.firstChild;
            } else {
                target = event.target;
            }

            if (target.naturalWidth < target.naturalHeight) {
                width = percentageFill;
                height = calculateRelativeLengthB(
                    width,
                    target.naturalWidth,
                    currentWidth.value,
                    target.naturalHeight,
                    currentHeight.value
                );

                if (height > 1) {
                    height = 1;
                    width = calculateRelativeLengthB(
                        height,
                        target.naturalHeight,
                        currentHeight.value,
                        target.naturalWidth,
                        currentWidth.value
                    );
                }
            } else {
                height = percentageFill;
                width = calculateRelativeLengthB(
                    height,
                    target.naturalHeight,
                    currentHeight.value,
                    target.naturalWidth,
                    currentWidth.value
                );

                if (width > 1) {
                    width = 1;
                    height = calculateRelativeLengthB(
                        width,
                        target.naturalWidth,
                        currentWidth.value,
                        target.naturalHeight,
                        currentHeight.value
                    );
                }
            }

            name = target.alt;
            elementType = new Asset(target.src);
        } else {
            height = setToRelative(200, currentHeight.value);
            width = setToRelative(200, currentWidth.value);
            elementType = new Text(name, setToRelative(24, currentWidth.value), 'Pangolin');
        }
        let element = new ElementDS(width, height, name, elementType);
        props.panel.addElement(element);
        if (!event) {
            comicStore.setCurrentElement(element);
        }
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

    function textUpdate(text) {
        props.panel.addAlteration();
    }

    function handleTextAlign(obj) {
        props.panel.addAlteration();
    }

    function delayUpdatePanelBoundingBox() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updatePanelBoundingBox();
        }, 300);
    }

    onMounted(() => {
        window.addEventListener('resize', delayUpdatePanelBoundingBox);
        //ddrContainer.value.addEventListener('click', (e) => console.log(e))
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
            <div class="w-100 h-100" ref="ddrContainer" v-if="currentWidth != 0 && currentHeight != 0">
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
                    @text-update="textUpdate"
                    @change-text-align="handleTextAlign"
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
        background-image: v-bind(panelBorder);
        background-size: 100% 100%;

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

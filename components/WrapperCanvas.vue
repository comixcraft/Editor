<script setup>
    import ElementDS from '~/utils/Classes/Element';
    import Text from '~/utils/Classes/Text';
    import Asset from '~/utils/Classes/Asset';

    const props = defineProps({
        panel: Object,
        panelIsActive: Boolean,
        lockAspectRatio: Boolean,
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

    function setToRelative(num, panelNum) {
        return num / panelNum;
    }

    function getFixed(num, panelNum) {
        return num * panelNum;
    }

    function updatePanelBoundingBox() {
        currentWidth.value = panelElement.value.clientWidth;
        currentHeight.value = panelElement.value.clientHeight;
        scaleByHeight.value =
            wrapperCanvas.value.clientWidth / wrapperCanvas.value.clientHeight > aspectRatioWidth / aspectRatioHeight;
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
        elements.get(obj.eId).setWidth(setToRelative(obj.width, currentWidth.value));
        elements.get(obj.eId).setHeight(setToRelative(obj.height, currentHeight.value));
    }

    function updatePosition(obj) {
        // update element position
        elements.get(obj.eId).pos = {
            x: setToRelative(obj.pos.x, currentWidth.value),
            y: setToRelative(obj.pos.y, currentHeight.value),
        };
    }

    function updateMirrorValues(obj) {
        // update element mirror values
        if (obj.direction === 'x') {
            elements.get(obj.eId).setIsMirroredHorizontal(obj.isMirrored);
            return;
        }
        elements.get(obj.eId).setIsMirroredVertical(obj.isMirrored);
    }

    function updateRotation(obj) {
        // update element rotation
        elements.get(obj.eId).setRotation(obj.rotation);
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
                width = setToRelative(200, currentWidth.value);
                height = setToRelative(
                    (getFixed(width, currentWidth.value) * event.target.naturalHeight) / event.target.naturalWidth,
                    currentHeight.value
                );
            } else {
                height = setToRelative(200, currentHeight.value);
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
    }

    function downElement(eId) {
        if (!props.panelIsActive) return;
        props.panel.moveZIndexDown(eId);
    }

    onMounted(() => {
        window.addEventListener('resize', updatePanelBoundingBox);

        updatePanelBoundingBox();
    });

    onBeforeUnmount(() => {
        comicStore.bus.off('add-element');
        comicStore.bus.off('putLayerBack');
        comicStore.bus.off('putLayerFront');
        window.removeEventListener('resize', updatePanelBoundingBox);
    });
</script>

<template>
    <div class="wrapper-canvas" ref="wrapperCanvas">
        <div
            ref="panelElement"
            class="panel swiper-no-swiping"
            :class="scaleByHeight ? 'panel--scale-by-height' : 'panel--scale-by-width'"
        >
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
                @delete-event="deleteElement"
                @update-event="updatePosition"
                @resize-event="resizeElement"
                @mirror-horizontal-event="updateMirrorValues"
                @mirror-vertical-event="updateMirrorValues"
                @rotate-event="updateRotation"
                @front-event="upElement"
                @back-event="downElement"
            />
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

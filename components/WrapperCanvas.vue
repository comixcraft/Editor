<script setup>
    import ElementDS from '~/utils/Classes/Element';
    import Text from '~/utils/Classes/Text';
    import Asset from '~/utils/Classes/Asset';

    const props = defineProps({
        panel: Object,
        panelIsActive: Boolean,
        lockAspectRatio: Boolean,
    });

    const canvasWidth = computed(() => DOMElementBoundingBox.width + 'px');
    const canvasHeight = computed(() => DOMElementBoundingBox.height + 'px');
    const DOMElementBoundingBox = reactive({ width: props.panel.width, height: props.panel.height });
    const comicStore = useComicStore();
    const elements = props.panel.elements;
    const container = ref(null);

    function setToRelative(num, panelNum) {
        return num / panelNum;
    }

    function getFixed(num, panelNum) {
        return num * panelNum;
    }

    function updatePanelBoundingBox() {
        DOMElementBoundingBox.width = container.value.clientWidth;
        DOMElementBoundingBox.height = container.value.clientHeight;
    }

    function validateElementId(eId) {
        if (!elements.has(eId)) {
            return;
        }
    }

    window.addEventListener('resize', updatePanelBoundingBox);

    function deleteElement(eId) {
        // delete last element of map
        props.panel.deleteElement(eId);
    }

    function resizeElement(obj) {
        // validate element id
        validateElementId(obj.eId);
        // update element width and height
        elements.get(obj.eId).pos = {
            x: setToRelative(obj.pos.x, props.panel.width),
            y: setToRelative(obj.pos.y, props.panel.height),
        };
        elements.get(obj.eId).setWidth(setToRelative(obj.width, props.panel.width));
        elements.get(obj.eId).setHeight(setToRelative(obj.height, props.panel.height));
    }

    function updatePosition(obj) {
        // validate element id
        validateElementId(obj.eId);
        // update element position
        elements.get(obj.eId).pos = {
            x: setToRelative(obj.pos.x, props.panel.width),
            y: setToRelative(obj.pos.y, props.panel.height),
        };
    }

    function updateMirrorValues(obj) {
        // validate element id
        validateElementId(obj.eId);

        // update element mirror values
        if (obj.direction === 'x') {
            elements.get(obj.eId).setIsMirroredHorizontal(obj.isMirrored);
            return;
        }
        elements.get(obj.eId).setIsMirroredVertical(obj.isMirrored);
    }

    function updateRotation(obj) {
        // validate element id
        validateElementId(obj.eId);
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
                width = setToRelative(200, props.panel.width);
                height = setToRelative(
                    (getFixed(width, props.panel.width) * event.target.naturalHeight) / event.target.naturalWidth,
                    props.panel.height
                );
            } else {
                height = setToRelative(200, props.panel.height);
                width = setToRelative(
                    (getFixed(height, props.panel.height) * event.target.naturalWidth) / event.target.naturalHeight,
                    props.panel.width
                );
            }

            let name = event.target.alt;
            let src = event.target.src;
            let newAsset = new Asset(src);
            tempEl = new ElementDS(width, height, name, newAsset);
        } else {
            const height = setToRelative(200, props.panel.height);
            const width = setToRelative(200, props.panel.width);
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

    onBeforeUnmount(() => {
        comicStore.bus.off('add-element');
        comicStore.bus.off('putLayerBack');
        comicStore.bus.off('putLayerFront');
        window.removeEventListener('resize', updatePanelBoundingBox);
    });
</script>

<template>
    <div>
        <div ref="container" class="panel">
            <DragResizeRotate
                v-for="[key, value] in elements"
                :key="key"
                :altText="value.alt"
                :eId="value.id"
                :h="value.height * props.panel.height"
                :isMirroredHorizontal="value.isMirroredHorizontal"
                :isMirroredVertical="value.isMirroredVertical"
                :rotation="value.rotation"
                :pos="value.pos"
                :url="value.type.path"
                :x="getFixed(value.pos.x, props.panel.width)"
                :y="getFixed(value.pos.y, props.panel.height)"
                :w="getFixed(value.width, props.panel.width)"
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
            <img :src="props.panel.border" class="panel__border" draggable="false" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .panel {
        width: v-bind(canvasWidth);
        height: v-bind(canvasHeight);
        position: relative;
        padding: 0;

        &__border {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            user-select: none;
        }
    }
</style>

<script setup>
    import Comic from '~/utils/Classes/Comic';
    import ElementDS from '~/utils/Classes/Element';
    import Text from '~/utils/Classes/Text';
    import Asset from '~/utils/Classes/Asset';

    const props = defineProps({
        height: Number,
        panel: Object,
        panelIsActive: Boolean,
        comic: Object,
        lockAspectRatio: Boolean,
        panelIndex: Number,
        arrayBB: Object,
    });

    const canvasHeight = computed(() => props.arrayBB[props.panelIndex].height + 'px');
    const canvasWidth = computed(() => props.arrayBB[props.panelIndex].width + 'px');
    const comicStore = useComicStore();
    const border = props.comic.getPage(0).getStrip(0).panels[props.panelIndex].border;
    const elements = props.comic.getPage(0).getStrip(0).panels[props.panelIndex].elements;

    onUpdated(() => {
        // props.panel === props.comic.getPage(0).getStrip(0).panels[props.activePanelIndex]
        //     ? console.log(widthPanel.value, heightPanel.value)
        //     : console.log('');
    });

    function validateElementId(eId) {
        if (!elements.has(eId)) {
            return;
        }
    }

    onBeforeUnmount(() => {
        comicStore.bus.off('add-element');
    });

    function deleteElement(eId) {
        // delete last element of map
        props.comic.getPage(0).getStrip(0).panels[props.panelIndex].deleteElement(eId);
    }

    function resizeElement(obj) {
        // validate element id
        validateElementId(obj.eId);
        // update element width and height
        elements.get(obj.eId).setPos({ x: obj.pos.x, y: obj.pos.y });
        elements.get(obj.eId).setWidth(obj.width);
        elements.get(obj.eId).setHeight(obj.height);
    }

    function updatePosition(obj) {
        // validate element id
        validateElementId(obj.eId);
        // update element position
        elements.get(obj.eId).setPos({ x: obj.pos.x, y: obj.pos.y });
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

    comicStore.bus.on('pop-closed', () => {
        // logic
    });

    comicStore.bus.on('add-element', (event) => {
        if (!props.panelIsActive) return;

        let tempEl;
        if (event) {
            let fixedHeight = 200;
            let name = event.target.alt;
            let src = event.target.src;
            let width = (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight;
            let newAsset = new Asset(src);
            tempEl = new ElementDS(width, fixedHeight, name, src, newAsset);
        } else {
            let fixedHeight = 200;
            let src = 'http://localhost:3000/catalog/Annotation/others/T%20Cell.png?raw=true';
            let width = 200;
            let name = 'Double-click to edit me.';
            let type = new Text(name, 24, 'Pangolin');
            tempEl = new ElementDS(width, fixedHeight, name, src, type);
        }
        props.comic.getPage(0).getStrip(0).getPanel(props.panelIndex).addElement(tempEl);
    });

    // functions

    function upElement(eId) {
        if (!props.panelIsActive) return;
        props.comic.getPage(0).getStrip(0).panels[props.panelIndex].moveZIndexUp(eId);
    }

    function downElement(eId) {
        if (!props.panelIsActive) return;
        props.comic.getPage(0).getStrip(0).panels[props.panelIndex].moveZIndexDown(eId);
    }

    onUpdated(() => {});

    onBeforeUnmount(() => {
        comicStore.bus.off('putLayerBack');
        comicStore.bus.off('putLayerFront');
    });
</script>

<template>
    <div>
        <div ref="container" class="panel container">
            <DragResizeRotate
                v-for="[key, value] in elements"
                :key="key"
                :altText="value.alt"
                :eId="value.id"
                :h="value.height"
                :isMirroredHorizontal="value.isMirroredHorizontal"
                :isMirroredVertical="value.isMirroredVertical"
                :rotation="value.rotation"
                :pos="value.pos"
                :url="value.src"
                :w="value.width"
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
            <img :src="border" class="panel__border" />
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

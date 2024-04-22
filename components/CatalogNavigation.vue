<script setup>
    // active menu item
    let characterCatalogShow = ref(false);
    let speechBubbleCatalogShow = ref(false);
    let textCatalogShow = ref(false);
    let shapesCatalogShow = ref(false);
    let sceneCatalogShow = ref(false);
    let allAssetsCatalogShow = ref(false);

    let subCharCatalogShow = ref(false);

    const characterButtons = [{ label: 'Single' }, { label: 'Multiple' }, { label: 'Facial Expressions' }];
</script>

<template>
    <button @click="characterCatalogShow = true">Characters</button>
    <button @click="speechBubbleCatalogShow = true">Speech Bubble</button>
    <button @click="textCatalogShow = true">Text</button>
    <button @click="shapesCatalogShow = true">Shapes</button>
    <button @click="sceneCatalogShow = true">Scenes</button>
    <button @click="allAssetsCatalogShow = true">All Assets</button>

    <PopupOverlay
        iconName="add_reaction"
        title="Characters"
        :show="characterCatalogShow"
        @close="characterCatalogShow = false"
    >
        <SubNavigation
            :show="characterCatalogShow"
            :buttons="characterButtons"
            @buttonClick="subCharCatalogShow"
        ></SubNavigation>
    </PopupOverlay>
    <PopupOverlay
        iconName="chat_bubble"
        title="Speech Bubble"
        :show="speechBubbleCatalogShow"
        @close="speechBubbleCatalogShow = false"
    >
        This is Speech Bubble
    </PopupOverlay>
    <PopupOverlay iconName="sticky_note" title="Text" :show="textCatalogShow" @close="textCatalogShow = false">
        This is Text
    </PopupOverlay>
    <PopupOverlay iconName="category" title="Shapes" :show="shapesCatalogShow" @close="shapesCatalogShow = false">
        This is Shapes
    </PopupOverlay>
    <PopupOverlay iconName="scene" title="Scene" :show="sceneCatalogShow" @close="sceneCatalogShow = false">
        This is Scene
    </PopupOverlay>
    <PopupOverlay
        iconName="image_search"
        title="All Assets"
        :show="allAssetsCatalogShow"
        @close="allAssetsCatalogShow = false"
    >
        This is All Assets
    </PopupOverlay>
</template>

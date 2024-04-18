<script setup>
    let characterCatalogShow = ref(false);
    let speechBubbleCatalogShow = ref(false);
    let textCatalogShow = ref(false);
    let shapesCatalogShow = ref(false);
    let sceneCatalogShow = ref(false);
    let allAssetsCatalogShow = ref(false);

    let subCharCatalogShow = ref(false);

    const characterButtons = [{ label: 'Single' }, { label: 'Multiple' }, { label: 'Facial Expressions' }];

    // Values should come from the template chosen before opening the editor
    const canvasWidth = ref(450);
    const canvasHeight = ref(750);
    useFetch('/api/catalog/structure')
        .then((response) => {
            console.log('Catalog structure', response.data.value);
        })
        .catch((error) => {
            createError(error);
        });

    let catalogElements = ref([]);
    await useFetch('/api/catalog/', {
        method: 'POST',
        body: {
            // category: ['characters'],
            // subCategory: ['single', 'multiple'],
            // filter: ['old']
        },
    })
        .then((response) => {
            catalogElements.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });
</script>

<template>
    <div class="editor">
        <div class="container">
            <WrapperCanvas></WrapperCanvas>
            <CatalogContainer :assets="catalogElements"></CatalogContainer>
        </div>

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
            <CatalogNavigation
                :show="characterCatalogShow"
                :buttons="characterButtons"
                @buttonClick="subCharCatalogShow"
            ></CatalogNavigation>
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

        <button>
            <NuxtLink
                :to="{
                    name: 'export',
                    path: '/export',
                    query: { width: canvasWidth, height: canvasHeight },
                }"
                >See Preview
            </NuxtLink>
        </button>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .editor {
        background-color: #6360f4;
    }
</style>

<script setup>
    import Panel from '~/utils/Classes/Panel.js';
    import ElementDS from '~/utils/Classes/Element.js';
    import Text from '~/utils/Classes/Text.js';

    // Values should come from the template chosen before opening the editor

    const canvasWidth = ref(450);
    const canvasHeight = ref(750);
    let catalogElements = ref([]);
    let catalogStructure = ref([]);

    // for testing matter
    let panelTest = new Panel(600, 'none');

    await useFetch('/api/catalog/structure')
        .then((response) => {
            catalogStructure.value = response.data.value;
        })
        .catch((error) => {
            createError(error);
        });

    function addElementToDisplay(e) {
        panelTest.addElement(e);
    }

    function fetchCatalogElements(category = [], subCategory = [], filter = []) {
        useFetch('/api/catalog/', {
            method: 'POST',
            body: {
                category: category,
                subCategory: subCategory,
                filter: filter,
            },
        })
            .then((response) => {
                catalogElements.value = response.data.value;
            })
            .catch((error) => {
                createError(error);
            });
    }

    function copyToElement() {
        elementsInCanvas.value = panelTest.currentState().elements;
    }

    function addNewTextToDisplay(event) {
        let fixedHeight = 200;
        let src = '';
        let width = 200;
        let availableInteger = 1;
        let name = 'text' + availableInteger;
        let type = new Text(name, 24);
        let tempEl = new ElementDS(width, fixedHeight, name, src, type);
        panelTest.addElement(tempEl);
    }

    // for testing matter
    function fillPanel() {
        elementsInCanvas.value.forEach((element) => {
            panelTest.addElement(element);
        });
    }

    onMounted(() => {
        fetchCatalogElements();
        fillPanel();
    });
</script>

<template>
    <div class="container">
        <WrapperCanvas :panel="panelTest"></WrapperCanvas>
        <div>
            <CatalogSearch
                placeholder="happy, barista, ..."
                :filters="catalogStructure.categories[0].subCategories[0].filter"
                @search="
                    (selectedFilter) => {
                        fetchCatalogElements(
                            catalogStructure.categories[0].name,
                            catalogStructure.categories[0].subCategories[0].name,
                            selectedFilter
                        );
                    }
                "
            />
            <CatalogContainer :assets="catalogElements" @add-element="addElementToDisplay"></CatalogContainer>
        </div>
    </div>

    <button>
        <NuxtLink
            :to="{
                name: 'export',
                path: '/export',
                query: { width: canvasWidth, height: canvasHeight },
            }"
            @click="copyToElement"
            >See Preview
        </NuxtLink>
    </button>
    <button @click="addNewTextToDisplay">Add a text</button>
</template>

<style scoped>
    .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>

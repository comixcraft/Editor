<script setup>
import ElementDS from "~/utils/Classes/Element.js";
import Text from "~/utils/Classes/Text.js";
// Values should come from the template chosen before opening the editor
const canvasWidth = ref(450);
const canvasHeight = ref(750);

function addNewTextToDisplay(event) {
  elementsCounter.value++;
  let fixedHeight = 200;
  let src = "";
  let width = 200;
  let availableInteger = 1;
  while (elementsInCanvas.value.has(availableInteger)) {
    availableInteger++;
  }
  let name = "text" + availableInteger;
  let type = new Text(name, 24);
  // width, height, alt, src
  let tempEl = new ElementDS(width, fixedHeight, name, src, type);
  elementsInCanvas.value.set(availableInteger, tempEl);
}

useFetch("/api/catalog/structure")
  .then((response) => {
    console.log("Catalog structure", response.data.value);
  })
  .catch((error) => {
    createError(error);
  });

let catalogElements = ref([]);
await useFetch("/api/catalog/", {
  method: "POST",
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
  <div class="container">
    <WrapperCanvas></WrapperCanvas>
    <CatalogContainer :assets="catalogElements"></CatalogContainer>
  </div>

  <button>
    <NuxtLink
      :to="{
        name: 'export',
        path: '/export',
        query: { width: canvasWidth, height: canvasHeight },
      }"
      >See Preview</NuxtLink
    >
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

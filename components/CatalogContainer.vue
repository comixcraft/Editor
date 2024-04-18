<script setup>
import ElementDS from "~/utils/Classes/Element.js";

defineProps({
  assets: Array,
});

function addNewElementToDisplay(event) {
  elementsCounter.value++;
  let fixedHeight = 200;
  let name = event.target.alt;
  let src = event.target.src;
  let width =
    (fixedHeight * event.target.naturalWidth) / event.target.naturalHeight;
  let availableInteger = 1;
  while (elementsInCanvas.value.has(availableInteger)) {
    availableInteger++;
  }
  // width, height, alt, src
  let tempEl = new ElementDS(width, fixedHeight, name, src, {getName: () => {return 'Asset'}});
  console.log('tempEl', tempEl.currentState().type.getName())
  elementsInCanvas.value.set(availableInteger, tempEl);
}
</script>

<template>
  <div class="catalog-scroll-container">
    <CatalogImagePreview
      v-for="asset in assets"
      :alt-text="asset.name"
      :url="asset.file_location"
      @click="addNewElementToDisplay"
    />
  </div>
</template>

<style scoped lang="scss">
.catalog-scroll-container {
  width: 300px;
  height: 700px;
  padding: $spacer-4 0;
  border: $border-width solid $black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: $spacer-4;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
}
</style>

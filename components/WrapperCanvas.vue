<script setup>
import ElementDS from "../utils/Classes/Element.js";

const textarea = ref(null);
let clicks = ref(0);
let modifyTextActive = ref(false);
let placeholderText = ref("yeah!");
let currentElement = ref(null);

function showMap() {
  console.clear();
  elementsInCanvas.value.forEach((value, key) => {
    console.log(
      `${key} is ${JSON.stringify(value.currentState())}. [instance of ElementDS: ${value instanceof ElementDS}]`
    );
  });
}

function deleteElement(elId) {
  // all z element
  changeZIndex(elId);
  // delete last element of map
  elementsInCanvas.value.delete(elementsInCanvas.value.size);
}

function changeZIndex(z) {
  // change all z index
  if (z > elementsInCanvas.value.size - 1) return; // stop recursive call when reaching second to last element (last one will be deleted)

  let nextElement = elementsInCanvas.value.get(z + 1);

  nextElement.setZIndex(z); // change z-index of next element
  elementsInCanvas.value.set(z, nextElement); // update map element with next element
  z++; // increment z index
  changeZIndex(z); // recursive
}

function startModifyText(newValue, element) {
  clicks.value++;
  if (clicks.value === 2) {
    modifyTextActive.value = newValue;
    nextTick(() => {
      currentElement.value = element;
      textarea.value.focus();
      placeholderText = element.currentState().type.getContent();
    });
  }
}

function stopModifyText() {
  modifyTextActive.value = false;
  clicks.value = 0;
  currentElement.value.currentState().type.setContent(textarea.value.value);
  textarea.value.value = "";
}

function resetClicks() {
  clicks.value = 0;
}
</script>

<template>
  <button @click="showMap">show map</button>
  <div class="wrapper" ref="container">
    <CanvasDraggableElement
      v-for="[key, value] in elementsInCanvas"
      @delete-event="deleteElement"
      :key="value.currentState().id"
      :eId="value.currentState().id"
      :z="value.currentState().z"
      :w="value.currentState().width"
      :h="value.currentState().height"
      :altText="value.currentState().name"
      :url="value.currentState().src"
      :pos="value.currentState().pos"
      :isMirrored="value.currentState().isMirrored"
      :type="value.currentState().type"
      :startModifyText="startModifyText"
      :resetClicks="resetClicks"
    />
    <div class="textarea-container" v-show="modifyTextActive">
      <input
        tabindex="0"
        :placeholder="placeholderText"
        ref="textarea"
        @blur="stopModifyText"
      />
    </div>
    <!-- <CanvasDraggableElement v-for="element in elementsInCanvas" :w="element.width" :h="element.height" :z="1" :altText="element.name" :url="element.src"/> -->
  </div>
</template>

<style>
@import "vue-draggable-resizable/style.css";

.wrapper {
  /* sould be defined dynamically once the value comes from template */
  width: 450px;
  height: 750px;

  border: 1px solid #000;
  overflow: hidden;
  display: grid;
}

.box {
  margin-top: 2rem;
  padding: 1rem;
  outline: solid 1px #ccc;
}

.hide {
  display: none;
}

.textarea-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(184 184 184 / 0.5);
}
</style>

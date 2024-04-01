<script setup>

    import ElementDS from '../utils/Classes/Element.js'
    
    function showMap() {
      console.clear()
      elementsInCanvas.value.forEach((value, key) => {
        console.log(`${key} is ${JSON.stringify(value.currentState())}. [instance of ElementDS: ${value instanceof ElementDS}]`)
      })
    }

    function deleteElement(elId) {
      // need to change all z element there;
      changeZIndex(elId)
      // delete last element of map
      elementsInCanvas.value.delete(elementsInCanvas.value.size)
    }

    function changeZIndex(z) {

      // change all z index
      if (z > elementsInCanvas.value.size - 1) return; // stop recursive call when reaching second to last element (last one will be deleted)

      let nextElement = elementsInCanvas.value.get(z + 1)
      let currElement = elementsInCanvas.value.get(z)

      elementsInCanvas.value.set(z, nextElement) // update map element with next element
      currElement.setZIndex(z) // update z index of element
      z++; // increment z index
      changeZIndex(z) // recursive
    }

</script>

<template>
    <button @click="showMap">show map</button>
    <div class="wrapper" id="canvasWrapper" ref="container">
      <CanvasDraggableElement v-for="[key, value] in elementsInCanvas"
        @delete-event="deleteElement"
        :key="value.currentState().id"
        :eId="value.currentState().id"
        :z="value.currentState().z"
        :w="value.currentState().width"
        :h="value.currentState().height"
        :altText="value.currentState().name" 
        :url="value.currentState().src"
      />
      <!-- <CanvasDraggableElement v-for="element in elementsInCanvas" :w="element.width" :h="element.height" :z="1" :altText="element.name" :url="element.src"/> -->
    </div>
  </template>
  
  <style>
  @import 'vue-draggable-resizable/style.css';
  
  .wrapper {
    width: 1000px;
    height: 700px;
    border: 1px solid #000;
    overflow: hidden;
  }

  .box {
  margin-top: 2rem;
  padding: 1rem;
  outline: solid 1px #ccc;
  }
  </style>
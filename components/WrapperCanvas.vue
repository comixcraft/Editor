<script setup>

    import ElementDS from '../utils/Classes/Element.js'

    function showMap() {
      console.clear()
      elementsInCanvas.value.forEach((value, key) => {
        console.log(`${key} is ${JSON.stringify(value.currentState())}. [instance of ElementDS: ${value instanceof ElementDS}]`)
      })
    }

</script>

<template>
    <button @click="showMap">show map</button>
    <div class="wrapper" id="canvasWrapper" ref="container">
      <CanvasDraggableElement v-for="[key, value] in elementsInCanvas"
        :z="key"
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
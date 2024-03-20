<script setup>
    import {ref, watch } from 'vue';

  // Watch for changes in the length of the entries array
  watch(() => elementsInCanvas.value.length, (newLength, oldLength) => {
        if (newLength > oldLength) {
          const newEntry = elementsInCanvas.value[newLength - 1];
        }
      });
</script>

<template>
    <div class="wrapper" id="canvasWrapper" ref="container">
      <CanvasDraggableElement v-for="element in elementsInCanvas" :w="element.width" :h="element.height" :z="1" :altText="element.name" :url="element.src"/>
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
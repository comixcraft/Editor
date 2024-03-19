<template>
    <div class="wrapper">
      <DraggableResizable :w="300" :h="300" :parent="true">
        <p>
          Hello! I'm a flexible component. You can drag me around and you can
          resize me.
        </p>
      </DraggableResizable>
    </div>
  </template>
  
  <style>
  @import 'vue-draggable-resizable/style.css';
  
  .wrapper {
    width: 1000px;
    height: 700px;
    border: 1px solid #000;
  }
  </style>
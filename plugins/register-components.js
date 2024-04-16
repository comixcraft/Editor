import DraggableResizable from 'vue-draggable-resizable';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('DraggableResizable', DraggableResizable);
});

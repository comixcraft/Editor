import DraggableResizable from 'vue-draggable-resizable';
import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate';
import '@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css';

export default defineNuxtPlugin((nuxtApp) => {
    //nuxtApp.vueApp.component('DraggableResizable', DraggableResizable)
    nuxtApp.vueApp.component('VueDragResizeRotate', VueDragResizeRotate);
});

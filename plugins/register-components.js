import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VueDragResizeRotate', VueDragResizeRotate);
});

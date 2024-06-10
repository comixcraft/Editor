import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate';
import ToastPlugin from 'vue-toast-notification';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VueDragResizeRotate', VueDragResizeRotate);
    nuxtApp.vueApp.component('ToastPlugin', ToastPlugin);
});

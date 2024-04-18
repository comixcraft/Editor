import { ref } from 'vue';

// dynamic elements
const elementsInCanvas = reactive(new Map());
let elementsCounter = ref(0);

export { elementsInCanvas, elementsCounter };

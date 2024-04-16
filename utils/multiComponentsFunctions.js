import { ref } from 'vue';

// dynamic elements
const elementsInCanvas = ref(new Map());
let elementsCounter = ref(0);

export { elementsInCanvas, elementsCounter };

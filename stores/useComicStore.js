import { defineStore } from 'pinia';

export const useComicStore = defineStore('comic', () => {
    let comic = reactive(null);

    function createComicWithConfig(config) {}

    return {
        comic,
        createComicWithConfig,
    };
});

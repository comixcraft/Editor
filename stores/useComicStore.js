import { defineStore } from 'pinia';
import Comic from '~/utils/Classes/Comic.js';
import Page from '~/utils/Classes/Page.js';
import Strip from '~/utils/Classes/Strip.js';
import Panel from '~/utils/Classes/Panel.js';
import mitt from 'mitt';

export const useComicStore = defineStore('comic', () => {
    let comic = new Comic(null, null, null);
    let currentElement = ref(null);
    let bus = mitt();

    const draft = ref(null);

    function saveDraft(json) {
        draft.value = json;
    }
    function getDraft() {
        return draft;
    }
    function deleteDraft() {
        draft.value = null;
    }

    if (process.client) {
        if (localStorage.getItem('draft') && localStorage.getItem('draft') !== 'null') {
            draft.value = Comic.fromJSON(localStorage.getItem('draft'));
        }

        if (localStorage.getItem('draft') === null) deleteDraft();

        watch(
            draft,
            (draftVal) => {
                localStorage.setItem('draft', draftVal);
            },
            { deep: true }
        );
    }

    function setCurrentElement(element) {
        currentElement.value = element;
    }

    function getCurrentElement() {
        return currentElement;
    }

    /**
     * @param {{height:Number, panels:{width: Number, border:String}[]}}config
     * @returns {Comic}
     */
    function createComicWithConfig(config) {
        const strip = new Strip(config.height);

        config.panels?.forEach((panel) => {
            strip.addPanelToStrip(new Panel(panel.width, panel.border));
        });

        const page = new Page();
        page.addStripToPage(strip);

        comic.addPageToComic(page);

        return comic;
    }

    function setComic(draft) {
        comic = draft;
        console.log(comic);
    }
    return {
        comic,
        bus,
        setComic,
        getDraft,
        saveDraft,
        deleteDraft,
        createComicWithConfig,
        setCurrentElement,
        getCurrentElement,
    };
});

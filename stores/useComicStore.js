import { defineStore } from 'pinia';
import Comic from '~/utils/Classes/Comic';
import Page from '~/utils/Classes/Page';
import Strip from '~/utils/Classes/Strip';
import Panel from '~/utils/Classes/Panel';
import ElementDS from '~/utils/Classes/Element';
import Asset from '~/utils/Classes/Asset';
import Text from '~/utils/Classes/Text';
import Position from '~/utils/Classes/Position';
import mitt from 'mitt';

export const useComicStore = defineStore('comic', () => {
    let comic = new Comic(null, null, null);
    let currentElement = ref(null);
    let bus = mitt();
    let currentCanvas = ref({});

    const draft = ref(null);

    function saveDraft(json) {
        draft.value = json;
    }
    function getDraft() {
        return draft;
    }

    function deleteDraft() {
        draft.value = null;
        localStorage.clear();
    }

    if (process.client) {
        if (localStorage.getItem('draft') && localStorage.getItem('draft') !== 'null') {
            draft.value = Comic.fromJSON(localStorage.getItem('draft'));
        }

        if (localStorage.getItem('draft') === null) deleteDraft();
    }

    watch(
        draft,
        (draftVal) => {
            localStorage.setItem('draft', draftVal);
        },
        { deep: true }
    );

    function setCurrentElement(element) {
        currentElement.value = element;
    }

    function getCurrentElement() {
        return currentElement;
    }

    function setCurrentCanvas(canvas) {
        currentCanvas.value = canvas;
    }

    function getCurrentCanvas() {
        return currentCanvas.value;
    }

    /**
     * @param {{height:Number, panels:{width: Number, border:String}[]}}config
     * @returns {Comic}
     */
    function createComicWithConfig(config) {
        comic.resetComic();
        const strip = new Strip(config.height);

        config.panels?.forEach((panel) => {
            strip.addPanelToStrip(new Panel(panel.width, config.height, panel.border));
        });

        const page = new Page();
        page.addStripToPage(strip);

        comic.addPageToComic(page);

        return comic;
    }

    function createComicFromDraft() {
        comic.resetComic();
        let refComic = getDraft().value;

        if (typeof refComic === 'string') {
            refComic = Comic.fromJSON(refComic);
        }

        const validateUndefinedAndNull = (value) => {
            // Check if the value is 'undefined' or 'null' as a string
            if (value === 'undefined' || value === 'null') {
                return value === 'undefined' ? undefined : null;
            }
            return value;
        };

        comic.name = refComic.name;
        comic.title = refComic.title;
        comic.creatorName = refComic.creatorName;

        // create page(s) and add them to comic through class method
        refComic.pages.forEach((page, iPage) => {
            let tempPage = new Page();
            comic.addPageToComic(tempPage);
            let currPage = comic.pages[iPage];
            page.strips.forEach((strip, iStrip) => {
                // for each strip, add them to corresponding pages
                let tempStrip = new Strip(strip.height);
                currPage.addStripToPage(tempStrip);
                let currStrip = currPage.strips[iStrip];
                strip.panels.forEach((panel, iPanel) => {
                    // add panels to corresponding strip
                    let tempPanel = new Panel(panel.width, currStrip.height, panel.border);
                    currStrip.addPanelToStrip(tempPanel);
                    let currPanel = currStrip.panels[iPanel];
                    panel.elements.forEach((element) => {
                        // add element to corresponding panel
                        let tempType;
                        // check what type of element it is
                        if (element.type._name === 'Asset') {
                            tempType = new Asset(element.type._path);
                        } else {
                            tempType = new Text(
                                element.type._content,
                                element.type._fontSize,
                                element.type._fontFamily
                            );
                        }
                        // create new element
                        let tempElement = new ElementDS(element.width, element.height, element.alt, tempType);
                        // set non-constructor proprieties
                        tempElement.z = element.z;
                        tempElement.isFocused = element.isFocused;
                        tempElement.isMirroredHorizontal = element.isMirroredHorizontal;
                        tempElement.isMirroredVertical = element.isMirroredVertical;
                        tempElement.rotation = element.rotation;
                        tempElement.pos = new Position(element.pos._x, element.pos._y);
                        currPanel.addElement(tempElement);
                    });
                });
            });
        });
    }

    return {
        comic,
        bus,
        getDraft,
        saveDraft,
        deleteDraft,
        createComicWithConfig,
        createComicFromDraft,
        setCurrentElement,
        getCurrentElement,
        setCurrentCanvas,
        getCurrentCanvas,
    };
});

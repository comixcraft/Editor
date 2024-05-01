import { v4 as uuidv4 } from 'uuid';

export default class Panel {
    /** @type {String} */
    _border;
    /** @type {Map<String, ElementDS>} */
    _elements;
    /** @type {Number} */
    _width;

    /**
     * @param {Number} width
     * @param {String} border
     */
    constructor(width = null, border = null) {
        this._width = width ?? 0;
        this._border = border ?? 'undefined';

        this.#init();
    }

    #init() {
        this._elements = reactive(new Map());
    }

    // GETTERS
    /**
     * @returns {String}
     */
    get border() {
        return this._border;
    }

    /**
     * @returns {Map<String, ElementDS>}
     */
    get elements() {
        return this._elements;
    }

    /**
     * @returns {Number}
     */
    get width() {
        return this._width;
    }

    /**
     * @param {String} id
     * @returns {ElementDS | undefined}
     */
    getElement(id) {
        return this.elements.get(id);
    }

    /**
     * @returns {{border: String, elements: ElementsDS[], width: Number}}
     */
    currentState() {
        return {
            border: this._border,
            elements: this._elements,
            width: this._width,
        };
    }

    // SETTERS
    /**
     * @param {ElementDS} element
     */
    addElement(element) {
        // find available integer
        let myUuid = uuidv4();

        // set id and z index of element
        element.setId(myUuid);
        element.setZIndex(this.getHighestZIndex() + 1);

        // set the element in map
        this._elements.set(myUuid, element);
    }

    /**
     * @param {String} id - key of the element in the map.
     */
    deleteElement(id) {
        this.elements.delete(id);
    }

    hasElement(id) {
        return this.elements.has(id);
    }

    moveZIndexUp(id) {
        // check if map size allow z-index change
        if (this.elements.size <= 1) {
            return;
        }

        let element = this.getElement(id);
        let elementZIndex = element.z;

        // check if z-index the highest
        if (elementZIndex === this.getHighestZIndex()) {
            return;
        }

        // return closest higher Z-Index element
        let zIndex = this.getHighestZIndex();
        let topElement = null;
        // look for z > elementZ starting from highest
        this.elements.forEach((el) => {
            if (el.z <= zIndex && el.z > elementZIndex) {
                zIndex = el.z;
                topElement = el;
            }
        });

        // switch this element
        topElement.setZIndex(elementZIndex);
        element.setZIndex(zIndex);
    }

    moveZIndexDown(id) {
        // check if map size allow z-index change
        if (this.elements.size <= 1) {
            return;
        }

        let element = this.getElement(id);
        let elementZIndex = element.z;

        // check if z-index the lowest
        if (elementZIndex === this.getLowestZIndex()) {
            return;
        }

        // return closest lower Z-Index element
        let zIndex = this.getLowestZIndex();
        let downElement = null;
        // look for z > elementZ starting from highest
        this.elements.forEach((el) => {
            if (el.z >= zIndex && el.z < elementZIndex) {
                zIndex = el.z;
                downElement = el;
            }
        });

        // switch this element
        downElement.setZIndex(elementZIndex);
        element.setZIndex(zIndex);
    }

    switchZIndexBetweenTwoElement(eId1, eId2) {
        if (!this.getElement(eId1) || !this.getElement(eId2)) {
            return;
        }

        let element1 = this.getElement(eId1);
        let elementZIndex1 = element1.z;
        let element2 = this.getElement(eId2);

        let tempZIndex = elementZIndex1;
        element1.z = element2.z;
        element2.z = tempZIndex;
    }

    getHighestZIndex() {
        let potentialZIndex = 0;
        this.elements.forEach((element) => {
            if (element.z > potentialZIndex) {
                potentialZIndex = element.z;
            }
        });
        return potentialZIndex;
    }

    getLowestZIndex() {
        let lowestZIndex = this.getHighestZIndex();

        this.elements.forEach((element) => {
            if (element.z < lowestZIndex) {
                lowestZIndex = element.z;
            }
        });
        return lowestZIndex;
    }
}

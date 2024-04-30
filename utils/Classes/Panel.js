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
        return this._elements.get(id);
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
        this._elements.delete(id);
    }

    getElement(id) {
        return this._elements.get(id);
    }

    hasElement(id) {
        return this._elements.has(id);
    }

    moveZIndexUp(id) {
        // check if map size allow z-index change
        if (this._elements.size <= 1) {
            console.log("Can't change the z-index when only one element is in the panel.");
            return;
        }

        let element = this.getElement(id);
        let elementZIndex = element.currentState().z;

        // check if z-index the highest
        if (elementZIndex === this.getHighestZIndex()) {
            console.log('the element is already the highest z-index of the panel.');
            return;
        }

        // return closest higher Z-Index element
        let zIndex = this.getHighestZIndex();
        let topElement = null;
        // look for z > elementZ starting from highest
        this._elements.forEach((el) => {
            if (el.currentState().z <= zIndex && el.currentState().z > elementZIndex) {
                zIndex = el.currentState().z;
                topElement = el;
            }
        });

        // switch this element
        topElement.setZIndex(elementZIndex);
        element.setZIndex(zIndex);
    }

    moveZIndexDown(id) {
        // check if map size allow z-index change
        if (this._elements.size <= 1) {
            console.log("Can't change the z-index when only one element is in the panel.");
            return;
        }

        let element = this.getElement(id);
        let elementZIndex = element.currentState().z;

        // check if z-index the lowest
        if (elementZIndex === this.getLowestZIndex()) {
            console.log('the element is already the lowest z-index of the panel.');
            return;
        }

        // return closest lower Z-Index element
        let zIndex = this.getLowestZIndex();
        let downElement = null;
        // look for z > elementZ starting from highest
        this._elements.forEach((el) => {
            if (el.currentState().z >= zIndex && el.currentState().z < elementZIndex) {
                zIndex = el.currentState().z;
                downElement = el;
            }
        });

        // switch this element
        downElement.setZIndex(elementZIndex);
        element.setZIndex(zIndex);
    }

    getHighestZIndex() {
        let potentialZIndex = 0;
        this._elements.forEach((element) => {
            if (element.currentState().z > potentialZIndex) {
                potentialZIndex = element.currentState().z;
            }
        });
        return potentialZIndex;
    }

    getLowestZIndex() {
        let lowestZIndex = this.getHighestZIndex();

        this._elements.forEach((element) => {
            if (element.currentState().z < lowestZIndex) {
                lowestZIndex = element.currentState().z;
            }
        });
        return lowestZIndex;
    }
}

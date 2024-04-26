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

    // Switch element
    /**
     * @returns {Number}
     */
    getHighestZIndex() {
        let potentialZIndex = 0;
        this._elements.forEach((element) => {
            if (element.currentState().z > potentialZIndex) {
                potentialZIndex = element.currentState().z;
            }
        });
        return potentialZIndex;
    }
}

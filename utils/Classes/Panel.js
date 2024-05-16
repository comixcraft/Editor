import Position from './Position';
import { watch } from 'vue';
export default class Panel {
    /** @type {String} */
    _border;
    /** @type {Map<String, ElementDS>} */
    _elements;
    /** @type {Number} */
    _width;
    /** @type {Number} */
    _height;

    //! refactor this later
    /** @type {Object} */
    _history;
    /** @type {Object} */
    _redo = [];
    /** @type {Number} */
    _maxHistoryIndex = 9;

    /**
     * @param {Number} width
     * @param {String} border
     */
    constructor(width = null, height = null, border = null) {
        this._width = width ?? 0;
        this._height = height ?? 0;
        this._border = border ?? 'undefined';

        this.#init();
    }

    //!add here to refactor
    #init() {
        this._elements = reactive(new Map());
        this._history = [this.toJSON()];
        watch(
            () => this.elements,
            () => console.log('change'),
            { deep: true }
        );
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
     * @returns {Number}
     */
    get height() {
        return this._height;
    }

    get history() {
        return this._history;
    }
    get redo() {
        return this._redo;
    }
    get maxHistoryLength() {
        return this._maxHistoryIndex;
    }

    // SETTERS
    set width(num) {
        this._width = num;
    }

    set border(str) {
        this._border = str;
    }

    set height(num) {
        this._height = num;
    }

    set history(history) {
        this._history = history;
    }

    set redo(redo) {
        this._redo = redo;
    }

    set maxHistoryLength(length) {
        this._maxHistoryIndex = length;
    }

    /**
     * @param {String} id
     * @returns {ElementDS | undefined}
     */
    getElement(id) {
        return this.elements.get(id);
    }

    /**
     * Apply the given state to the panel.
     * @param {Object} state
     */
    applyState(state) {
        let parsedState = reactive(Panel.fromJSON(state));
        console.log(parsedState.elements);
        if (parsedState.elements.size > 0) {
            this.elements.forEach((value, key) => {
                console.log(value._rotation);
                value._pos = new Position(parsedState.elements.get(key).pos._x, parsedState.elements.get(key).pos._y);
                value._isMirroredHorizontal = parsedState.elements.get(key).isMirroredHorizontal;
                value._isMirroredVertical = parsedState.elements.get(key).isMirroredVertical;
                value._rotation = parsedState.elements.get(key).rotation;
                console.log(parsedState.elements.get(key).rotation);
            });
        } else {
            //* DONE
            this.clearMaps();
        }
    }

    /**
     * Push changes into the history array
     * @param {Object} alteration
     */
    addAlteration() {
        let currentState = this.toJSON();
        this.history.push(currentState);
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
        this.redo = [];
    }

    undo() {
        if (this.history.length <= 1) return;

        let lastState = this.history.pop();
        this.redo.push(lastState);
        this.applyState(this.history[this.history.length - 1]);
    }
    //! fix this
    redoAction() {
        let nextState = this.redo.pop();
        let currentState = this.toJSON();
        this.applyState(nextState);
        this.history.push(currentState);
    }

    //!
    clearMaps() {
        this._elements.clear();
    }
    addElement(element) {
        // set z index of element
        element.z = this.getHighestZIndex() + 1;
        // set the element in map
        this.elements.set(element.id, element);
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
        topElement.z = elementZIndex;
        element.z = zIndex;
    }

    moveZIndexDown(id) {
        // check if map size allow z-index change
        if (this.elements.size <= 1) {
            return;
        }

        let element = this.getElement(id);
        let elementZIndex = element.z;

        // check if z-index the lowest
        if (elementZIndex === this.getLowestZIndex(id)) {
            return;
        }

        // return closest lower Z-Index element
        let zIndex = this.getLowestZIndex(id);
        let downElement = null;
        // look for z > elementZ starting from highest
        this.elements.forEach((el) => {
            if (el.z >= zIndex && el.z < elementZIndex) {
                zIndex = el.z;
                downElement = el;
            }
        });

        // switch this element
        downElement.z = elementZIndex;
        element.z = zIndex;
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

    getLowestZIndex(id) {
        let lowestZIndex = this.getElement(id).z;

        this.elements.forEach((element) => {
            if (element.z < lowestZIndex) {
                lowestZIndex = element.z;
            }
        });
        return lowestZIndex;
    }

    toJSON() {
        return JSON.stringify({
            border: this.border,
            width: this.width,
            elements: JSON.stringify(Array.from(this.elements.entries())),
        });
    }

    static fromJSON(str) {
        const parsedObj = JSON.parse(str);
        const elementsArray = JSON.parse(parsedObj.elements).map(([id, element]) => [id, JSON.parse(element)]);
        parsedObj.elements = new Map(elementsArray);
        return parsedObj;
    }
}

import Position from './Position';
import { watch, reactive } from 'vue';
import ElementDS from './Element';
import Asset from './Asset';
import Text from './Text';

export default class Panel {
    /** @type {String} */
    _border;
    /** @type {Map<String, ElementDS>} */
    _elements;
    /** @type {Number} */
    _width;
    /** @type {Number} */
    _height;
    /** @type {Object} */
    _history;
    /** @type {Object} */
    _redo;
    /** @type {Number} */
    _maxHistoryIndex;

    /**
     * Constructs a new Panel.
     * @param {Number} width
     * @param {Number} height
     * @param {String} border
     */
    constructor(width = null, height = null, border = null) {
        this._width = width ?? 0;
        this._height = height ?? 0;
        this._border = border ?? 'undefined';

        this.#init();
    }

    #init() {
        this._elements = reactive(new Map());
        this._history = [this.toJSON()];
        this._redo = [];
        this._maxHistoryIndex = 9;
    }

    // GETTER

    /** @returns {String} */
    get border() {
        return this._border;
    }

    /** @returns {Map<String, ElementDS>} The elements map.*/
    get elements() {
        return this._elements;
    }

    /** @returns {Number}*/
    get width() {
        return this._width;
    }

    /** @returns {Number}*/
    get height() {
        return this._height;
    }

    /** @returns {Object[]}*/
    get history() {
        return this._history;
    }

    /** @returns {Object[]}*/
    get redo() {
        return this._redo;
    }

    /** @returns {Boolean}*/
    get cantUndo() {
        return this.history.length === 1;
    }

    /** @returns {Boolean}*/
    get cantRedo() {
        return this.redo.length === 0;
    }

    /** @returns {Number}*/
    get maxHistoryLength() {
        return this._maxHistoryIndex;
    }

    //SETTER

    /** @param {Number} num The width to set.*/
    set width(num) {
        this._width = num;
    }

    /** @param {String} str The border style to set.*/
    set border(str) {
        this._border = str;
    }

    /** @param {Number} num*/
    set height(num) {
        this._height = num;
    }

    /** @param {Object[]} history*/
    set history(history) {
        this._history = history;
    }

    /** @param {Object[]} redo*/
    set redo(redo) {
        this._redo = redo;
    }

    /** @param {Number} length*/
    set maxHistoryLength(length) {
        this._maxHistoryIndex = length;
    }

    //METHODS

    /**
     * @param {ElementDS} element
     */
    addElement(element) {
        element.z = this.getHighestZIndex() + 1;
        this.elements.set(element.id, element);
        this.addAlteration();
    }

    addAlteration() {
        console.log('here we go again');
        this._redo = [];
        let currentState = this.toJSON();
        this.history.push(currentState);
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
    }

    /**
     * @param {string} state
     */
    applyState(state) {
        let parsedState = Panel.fromJSON(state);

        if (parsedState.elements.size > 0) {
            let elementsToDelete = new Set(this.elements.keys());
            parsedState.elements.forEach((value, key) => {
                elementsToDelete.delete(key);
                if (!this.hasElement(key)) {
                    let tempType =
                        value.type._name === 'Asset'
                            ? new Asset(value.type._path)
                            : new Text(value.type._content, value.type._fontSize, value.type._fontFamily);
                    let tempEl = new ElementDS(value.width, value.height, value.alt, tempType);
                    tempEl.id = value.id;
                    tempEl.pos = new Position(value.pos._x, value.pos._y);
                    tempEl.isMirroredHorizontal = value.isMirroredHorizontal;
                    tempEl.isMirroredVertical = value.isMirroredVertical;
                    tempEl.rotation = value.rotation;
                    tempEl.z = value.z;
                    tempEl.width = value.width;
                    tempEl.height = value.height;
                    this.elements.set(tempEl.id, tempEl);
                } else {
                    let targetElement = this.getElement(key);
                    this.setPropertiesTo(
                        value,
                        targetElement,
                        ['width', 'height', 'pos', 'isMirroredHorizontal', 'isMirroredVertical', 'rotation', 'z'],
                        true
                    );
                }
            });
            elementsToDelete.forEach((key) => {
                this.elements.delete(key);
            });
        } else {
            this.clearMaps();
        }
    }

    clearMaps() {
        this.elements.clear();
    }

    /**
     * @param {string} id
     */
    deleteElement(id) {
        this.elements.delete(id);
        this.addAlteration();
    }

    /**
     * @param {string} id
     * @returns {ElementDS}
     */
    getElement(id) {
        return this.elements.get(id);
    }

    /**
     * @returns {number}
     */
    getHighestZIndex() {
        let potentialZIndex = 0;
        this.elements.forEach((element) => {
            if (element.z > potentialZIndex) {
                potentialZIndex = element.z;
            }
        });
        return potentialZIndex;
    }

    /**
     * @param {string} id
     * @returns {number}
     */
    getLowestZIndex(id) {
        let lowestZIndex = this.getElement(id).z;
        this.elements.forEach((element) => {
            if (element.z < lowestZIndex) {
                lowestZIndex = element.z;
            }
        });
        return lowestZIndex;
    }

    /**
     * @param {string} id
     * @returns {boolean}
     */
    hasElement(id) {
        return this.elements.has(id);
    }

    /**
     * @param {string} id
     */
    moveZIndexDown(id) {
        if (this.elements.size <= 1) return;
        let element = this.getElement(id);
        let elementZIndex = element.z;
        if (elementZIndex === this.getLowestZIndex(id)) return;
        let zIndex = this.getLowestZIndex(id);
        let downElement = null;
        this.elements.forEach((el) => {
            if (el.z >= zIndex && el.z < elementZIndex) {
                zIndex = el.z;
                downElement = el;
            }
        });
        downElement.z = elementZIndex;
        element.z = zIndex;
    }

    /**
     * @param {string} id
     */
    moveZIndexUp(id) {
        if (this.elements.size <= 1) return;
        let element = this.getElement(id);
        let elementZIndex = element.z;
        if (elementZIndex === this.getHighestZIndex()) return;
        let zIndex = this.getHighestZIndex();
        let topElement = null;
        this.elements.forEach((el) => {
            if (el.z <= zIndex && el.z > elementZIndex) {
                zIndex = el.z;
                topElement = el;
            }
        });
        topElement.z = elementZIndex;
        element.z = zIndex;
    }

    redoAction() {
        if (this._redo.length > 0) {
            let nextState = this._redo.pop();
            this.applyState(nextState);
            this.history.push(nextState);
        }
    }

    /**
     * @param {Object} oSource
     * @param {Object} oTarget
     * @param {string[]} properties
     * @param {boolean} useDashPrefix
     */
    setPropertiesTo(oSource, oTarget, properties, useDashPrefix) {
        if (oTarget._type._name === 'Text') {
            oTarget._type._content = oSource.type._content;
            oTarget._type._fontSize = oSource.type._fontSize;
            oTarget._type._fontFamily = oSource.type._fontFamily;
        }
        properties.forEach((property) => {
            let propertyName = useDashPrefix ? `_${property}` : property;
            if (!oSource.hasOwnProperty(property)) return;
            if (property === 'pos' && oSource[property]._x !== undefined && oSource[property]._y !== undefined) {
                oTarget[propertyName] = new Position(oSource[property]._x, oSource[property]._y);
            } else if (oTarget.hasOwnProperty(propertyName)) {
                oTarget[propertyName] = oSource[property];
            }
        });
    }

    /**
     * @returns {string}
     */
    toJSON() {
        return JSON.stringify({
            border: this.border,
            width: this.width,
            elements: JSON.stringify(Array.from(this.elements.entries())),
        });
    }

    undo() {
        console.log('undoing' + this.history.length);
        if (this.history.length <= 1) return;
        let currentState = this.history.pop();
        this._redo.push(currentState);
        let previousState = this.history[this.history.length - 1];
        this.applyState(previousState);
    }

    /**
     * @param {string} str
     * @returns {Panel}
     */
    static fromJSON(str) {
        const parsedObj = JSON.parse(str);
        const elementsArray = JSON.parse(parsedObj.elements).map(([id, element]) => [id, JSON.parse(element)]);
        parsedObj.elements = new Map(elementsArray);
        return parsedObj;
    }
}

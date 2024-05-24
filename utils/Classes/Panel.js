import Position from './Position';
import { watch, reactive } from 'vue';
import ElementDS from './Element';
import Asset from './Asset';
import Text from './Text';

export default class Panel {
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

    get border() {
        return this._border;
    }
    get elements() {
        return this._elements;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get history() {
        return this._history;
    }
    get redo() {
        return this._redo;
    }
    get cantUndo() {
        return this.history.length === 1;
    }
    get cantRedo() {
        return this.redo.length === 0;
    }
    get maxHistoryLength() {
        return this._maxHistoryIndex;
    }

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

    getElement(id) {
        return this.elements.get(id);
    }
    hasElement(id) {
        return this.elements.has(id);
    }

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
                            : new Text(value.type._content, value.type._fontSize, value.type.fontFamily);
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

            // Remove elements that are not present in the new state
            elementsToDelete.forEach((key) => {
                this.elements.delete(key);
            });
        } else {
            this.clearMaps();
        }
    }

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

    addAlteration() {
        console.log('here we go again');
        this._redo = [];
        let currentState = this.toJSON();
        this.history.push(currentState);
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
    }

    undo() {
        console.log('undoing' + this.history.length);
        if (this.history.length <= 1) return;
        let currentState = this.history.pop();
        this._redo.push(currentState);
        let previousState = this.history[this.history.length - 1];
        this.applyState(previousState);
    }

    redoAction() {
        if (this._redo.length > 0) {
            let nextState = this._redo.pop();
            this.applyState(nextState);
            this.history.push(nextState);
        }
    }

    clearMaps() {
        this.elements.clear();
    }

    addElement(element) {
        element.z = this.getHighestZIndex() + 1;
        this.elements.set(element.id, element);
        this.addAlteration();
    }

    deleteElement(id) {
        this.elements.delete(id);
        this.addAlteration();
    }

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

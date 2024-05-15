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
    _currentState;

    /**
     * @param {Number} width
     * @param {String} border
     */
    constructor(width = null, height = null, border = null) {
        this._width = width ?? 0;
        this._height = height ?? 0;
        this._border = border ?? 'undefined';
        this._history = [];
        this._redo = [];
        this._maxHistoryLength = 9;
        this._currentState = {};

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
        return this._maxHistoryLength;
    }

    /**
     * @returns {Object}
     */
    get currentState() {
        return this._currentState;
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

    set currentState(state) {
        this._currentState = state;
    }

    set history(history) {
        this._history = history;
    }

    set redo(redo) {
        this._redo = redo;
    }

    set maxHistoryLength(length) {
        this._maxHistoryLength = length;
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
        this.border = state.border;
        this.width = state.width;
        this.elements.clear();
        console.log('State elements:', state.elements);
        for (const [id, element] of state.elements.entries()) {
            if (element.type) {
                this.elements.set(id, element);
            } else {
                console.error('Type is undefined for element:', element);
            }
        }
    }
    /**
     * Push changes into the history array
     * @param {Object} alteration
     */
    addAlteration() {
        const currentState = this.toJSON();
        console.log('Current state:', currentState);
        this.history.push(currentState);
        console.log('History after push:', this.history);
        console.log('redo after push:', this.redo);
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
        this.redo = [];
    }

    undo() {
        if (this.history.length > 0) {
            console.log('I am in the if statement UNDO. the length of history is ', this.history.length);
            const lastState = this.history.pop();
            console.log('Last state:', lastState);
            const parsedState = Panel.fromJSON(lastState);
            console.log('Parsed state:', parsedState);
            const currentState = this.toJSON();
            this.applyState(parsedState);
            this.redo.push(currentState);
            console.log('redo after push:', this.redo);
        }
    }

    redoAction() {
        if (this.redo.length > 0) {
            console.log(
                'I am in the if statement REDO. the length of history is ',
                this.history.length,
                this.redo.length
            );
            const nextState = this.redo.pop();
            console.log('Next state:', nextState);
            const currentState = this.toJSON();
            this.applyState(Panel.fromJSON(nextState));
            this.history.push(currentState);
        }
    }

    // SETTERS
    /**
     * @param {ElementDS} element
     */
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
        let returnObj = JSON.parse(str);
        let tempArr = [];
        JSON.parse(returnObj.elements).forEach((el, index) => {
            tempArr.push([
                JSON.parse(returnObj.elements)[index][0],
                JSON.parse(JSON.parse(returnObj.elements)[index][1]),
            ]);
        });
        returnObj.elements = new Map(tempArr);
        return returnObj;
    }
}

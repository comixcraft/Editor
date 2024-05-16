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
        this._currentState = {};

        this.#init();
    }

    //!add here to refactor
    #init() {
        this._elements = reactive(new Map());
        this._history = [this.toJSON];
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
        parsedState.elements.forEach((value, key) => {
            console.log(this.getElement(key));
            console.log(value);

            this.getElement(key).pos = value.pos;
        });
        //& recieve the state to apply => state is a json
        //& in my state there is border, width, height, elements... only elements change
        //& on the screen I have the latest state of elements => this.elements

        //& apply the state
        //& on the screen i want the lasted state to replaced by the passed state => this.elements
        //& the elements should be exactly how they were on the passed state (...transforms)
        //& remove what is rendered
        //& replace it with the passed state
    }

    /**
     * Push changes into the history array
     * @param {Object} alteration
     */
    //! works
    addAlteration() {
        const currentState = this.toJSON();
        this.history.push(currentState);
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
        this.redo = [];
    }

    undo() {
        if (this.history.length <= 1) return;

        this.applyState(this.history[this.history.length - 1]);
        const lastState = this.history.pop();
        this.redo.push(lastState);
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
        const parsedObj = JSON.parse(str);
        const elementsArray = JSON.parse(parsedObj.elements).map(([id, element]) => [id, JSON.parse(element)]);
        parsedObj.elements = new Map(elementsArray);
        return parsedObj;
    }
}

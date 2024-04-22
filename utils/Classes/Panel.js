import { v4 as uuidv4 } from 'uuid';

export default class Panel {
    _border;
    _elements;
    _width;

    constructor(width, border) {
        this._width = width;
        this._border = border;

        this.#init();
    }

    #init() {
        this._elements = reactive(new Map());
    }

    // GETTERS

    currentState() {
        return {
            border: this._border,
            elements: this._elements,
            width: this._width,
        };
    }

    // SETTERS
    /**
     * @param {ElementDS} element - An instance of the ElementDS class.
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

    deleteElement(id) {
        this._elements.delete(id);
    }
    // switch element

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

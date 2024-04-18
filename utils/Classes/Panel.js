import { v4 as uuidv4 } from 'uuid';

export default class Panel {
    #border;
    #elements;
    #width;

    constructor(width, border) {
        this.#width = width;
        this.#border = border;

        this.#init();
    }

    #init() {
        this.#elements = reactive(new Map());
    }

    // GETTERS

    currentState() {
        return {
            border: this.#border,
            elements: this.#elements,
            width: this.#width,
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
        element.setZIndex(this.#getHighestZIndex() + 1);

        // set the element in map
        this.#elements.set(myUuid, element);
    }

    deleteElement(id) {
        this.#elements.delete(id);
    }
    // switch element

    #getHighestZIndex() {
        let potentialZIndex = 0;
        this.#elements.forEach((element) => {
            if (element.currentState().z > potentialZIndex) {
                potentialZIndex = element.currentState().z;
            }
        });
        return potentialZIndex;
    }
}

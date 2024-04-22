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

    getElement(id) {
        return this.#elements.get(id);
    }

    moveZIndexUp(id) {
        // check if map size allow z-index change
        if (this.#elements.size <= 1) {
            console.log("Can't change the z-index when only one element is in the panel.");
            return;
        }

        let element = this.getElement(id);
        let elementZIndex = element.currentState().z;

        // check if z-index the highest
        if (elementZIndex === this.#getHighestZIndex()) {
            console.log('the element is already the highest z-index of the panel.');
            return;
        }

        // return closest higher Z-Index element
        let zIndex = this.#getHighestZIndex();
        let topElement = null;
        // look for z > elementZ starting from highest
        this.#elements.forEach((el) => {
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
        if (this.#elements.size <= 1) {
            console.log("Can't change the z-index when only one element is in the panel.");
            return;
        }

        let element = this.getElement(id);
        let elementZIndex = element.currentState().z;

        // check if z-index the lowest
        if (elementZIndex === this.#getLowestZIndex()) {
            console.log('the element is already the lowest z-index of the panel.');
            return;
        }

        // return closest lower Z-Index element
        let zIndex = this.#getLowestZIndex();
        let downElement = null;
        // look for z > elementZ starting from highest
        this.#elements.forEach((el) => {
            if (el.currentState().z >= zIndex && el.currentState().z < elementZIndex) {
                zIndex = el.currentState().z;
                downElement = el;
            }
        });

        // switch this element
        downElement.setZIndex(elementZIndex);
        element.setZIndex(zIndex);
    }

    #getHighestZIndex() {
        let potentialZIndex = 0;
        this.#elements.forEach((element) => {
            if (element.currentState().z > potentialZIndex) {
                potentialZIndex = element.currentState().z;
            }
        });
        return potentialZIndex;
    }

    #getLowestZIndex() {
        let lowestZIndex = this.#getHighestZIndex();

        this.#elements.forEach((element) => {
            if (element.currentState().z < lowestZIndex) {
                lowestZIndex = element.currentState().z;
            }
        });
        return lowestZIndex;
    }
}

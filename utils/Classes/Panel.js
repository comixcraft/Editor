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
        let availableInteger = this.#findAvailableInteger();
        let myuuid = uuidv4();

        // set id and z index of element
        element.setId(myuuid);
        element.setZIndex(this.#setZIndexToLast());

        // set the element in map
        this.#elements.set(availableInteger, element);
    }

    deleteElement(id) {
        this.#elements.delete(id);
    }
    // switch element

    #findAvailableInteger() {
        let availableInteger = 1;
        while (this.#elements.has(availableInteger)) {
            availableInteger++;
        }
        return availableInteger;
    }

    #setZIndexToLast() {
        // if map element is empty return 1;
        if (this.#elements.size === 0) return 1;
        // get last entry of the elementsInCanvas Map
        return this.#getLastEntryOfMap(this.#elements).z + 1;
    }

    #getLastEntryOfMap(map) {
        let lastEntry;
        for (const entry of map.entries()) {
            lastEntry = entry;
        }
        return lastEntry[1].currentState();
    }
}

import Position from './Position.js';

export default class ElementDS {
    #id;
    #z;
    #pos = new Position(0, 0);
    #isFocused = false;
    #isMirrored = false;
    #rotation = 0;
    #width;
    #height;
    #src;
    #alt;
    #type;

    constructor(width, height, alt, src) {
        this.#width = width;
        this.#height = height;
        this.#src = src;
        this.#alt = alt;

        this.#init();
    }

    #init() {
        this.#z = this.#setZIndexToLast();
        this.#id = this.#setIdToLastPossibleInteger();
    }

    currentState = () => {
        return this.#getCurrentState();
    };

    #getCurrentState() {
        return {
            id: this.#id,
            z: this.#z,
            pos: this.#pos,
            isFocused: this.#isFocused,
            isMirrored: this.#isMirrored,
            rotation: this.#rotation,
            width: this.#width,
            height: this.#height,
            src: this.#src,
            alt: this.#alt,
        };
    }

    setPos = (obj) => {
        this.#pos.definePos(obj);
    };

    setZIndex = (n) => {
        this.#z = n;
    };

    setIsMirrored = (bool) => {
        this.#isMirrored = bool;
    };

    set focused(bool) {
        this.#isFocused = bool;
    }

    setWidth = (width) => {
        this.#width = width;
    };

    setHeight = (height) => {
        this.#height = height;
    };

    // init functions
    #setIdToLastPossibleInteger() {
        // if map element is empty return 1;
        if (elementsInCanvas.size === 0) return 1;
        // get last entry of the elementsInCanvas Map
        return this.#getLastEntryOfMap(elementsInCanvas).id + 1;
    }

    #setZIndexToLast() {
        // if map element is empty return 1;
        if (elementsInCanvas.size === 0) return 1;
        // get last entry of the elementsInCanvas Map
        return this.#getLastEntryOfMap(elementsInCanvas).z + 1;
    }

    #getLastEntryOfMap(map) {
        let lastEntry;
        for (const entry of map.entries()) {
            lastEntry = entry;
        }
        return lastEntry[1].currentState();
    }
}

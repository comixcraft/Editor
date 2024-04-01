import Position from "./Position.js";

export default class ElementDS {

    #id;
    #z;
    #pos = new Position(undefined, undefined);
    #isFocused = false;
    #isMirrored = false;
    #rotation = 0;
    #width;
    #height;
    #src;
    #alt;

    constructor (width, height, alt, src) {
        this.#width = width;
        this.#height = height;
        this.#src = src;
        this.#alt = alt;

        this.#init();
    }

    #init() {
        this.#z = this.#getFirstAvailableInteger();
        this.#id = this.#setIdToLastPossibleInteger();
    }

    // getter
    currentState = () => {
        return this.#getCurrentState();
    }

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
        }
    }

    // setters
    setPos = (obj) => {
        this.#pos.definePos(obj);
    }

    setZIndex = (n) => {
        this.#z = n;
    }

    set mirroring(bool) {
        this.#isMirrored = bool;
    }

    set focused(bool) {
        this.#isFocused = bool;
    }

    // init functions
    #setIdToLastPossibleInteger() {
        // if map element is empty return 1;
        if (elementsInCanvas.value.size === 0) return 1;

        // get last entry of the elementsInCanvas Map
        let lastEntry;
        for (const entry of elementsInCanvas.value.entries()) {
            lastEntry = entry;
        }
        return lastEntry[1].currentState().id + 1;

    }

    #getFirstAvailableInteger() {
        let i = 1;
        while (elementsInCanvas.value.has(i)) {
            i++;
        }
        return i;
    }
}
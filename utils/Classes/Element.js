import Position from './Position.js';

export default class ElementDS {
    #id;
    #z;
    #pos = new Position(0, 0);
    #isFocused = false;
    #isMirrored = false;
    #isMirroredVertical = false;
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
            isMirroredVertical: this.#isMirroredVertical,
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

    setId = (n) => {
        this.#id = n;
    };

    setIsMirrored = (bool) => {
        this.#isMirrored = bool;
    };

    setIsMirroredVertical = (bool) => {
        this.#isMirroredVertical = bool;
    };

    setRotation = (n) => {
        this.#rotation = n;
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
}

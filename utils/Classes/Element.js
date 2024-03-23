import Position from "./Position.js";

export default class ElementDS {

    #pos = new Position(0, 0);
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
    }

    // getter
    get currentState() {
        return this.#getCurrentState();
    }

    #getCurrentState() {
        return {
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
    set setPos(obj) {
        this.#pos.definePos(obj);
    }

    set mirroring(bool) {
        this.#isMirrored = bool;
    }

    set focused(bool) {
        this.#isFocused = bool;
    }


}
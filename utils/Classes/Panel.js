export default class Panel {

    #border;
    #elements;
    #width;

    constructor (width, elements, border) {
        this.#width = width;
        this.#border = border;
        this.#elements = elements;
    }

    // GETTERS

    get border() {
        return this.#border
    }    
    
    get elements() {
        return this.#elements
    }    
    
    get width() {
        return this.#width
    }

    // SETTERS

    set border(borderParam) {
        this.#border = borderParam
    }

    set elements(elementsMap) {
        this.#elements = elementsMap
    }

    set width(x) {
        this.#width = x
    }
}
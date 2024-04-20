export default class Asset {
    #name = 'Asset';
    #path;
    #id;

    constructor(path) {
        this.#path = path;
    }

    // GETTERS
    get path() {
        return this.#path;
    }

    get id() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    // SETTERS
    set path(p) {
        this.#path = p;
    }

    set id(id) {
        this.#id = id;
    }
}

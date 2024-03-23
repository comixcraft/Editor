class Position {
    #x;
    #y;

    constructor (x, y) {
        this.#x = x;
        this.#y = y;
    }

    // getter 
    get currPos() {
        return this.#getCurrentPosition();
    }

    #getCurrentPosition() {
        return {x: this.#x, y: this.#y};
    }

    // setter
    set definePos({x, y}) {
        this.#x = x;
        this.#y = y;
    }
}
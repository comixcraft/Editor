export default class Position {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // getter
    currPos = () => {
        return this.#getCurrentPosition();
    };

    #getCurrentPosition() {
        return { x: this.#x, y: this.#y };
    }

    // setter
    definePos = (obj) => {
        return this.#definePosition(obj);
    };

    #definePosition = (obj) => {
        this.#x = obj.x;
        this.#y = obj.y;
    };
}

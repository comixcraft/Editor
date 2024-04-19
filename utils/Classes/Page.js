export default class Page {
    #strips;

    constructor() {
        this.#init();
    }

    #init() {
        this.#strips = [];
    }

    // GETTER

    get strips() {
        return this.#strips;
    }

    addStripToPage(strip) {
        this.#strips.push(strip);
    }
}

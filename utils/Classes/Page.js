export default class Page {
    _strips;

    constructor() {
        this.#init();
    }

    #init() {
        this._strips = [];
    }

    // GETTER

    get strips() {
        return this._strips;
    }

    getStrip(index) {
        return this._strips[index];
    }

    // SETTER

    addStripToPage(strip) {
        this._strips.push(strip);
    }
}

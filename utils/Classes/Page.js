export default class Page {
    /** @type {Strip[]} */
    _strips;

    constructor() {
        this.#init();
    }

    #init() {
        this._strips = [];
    }

    // GETTER
    /**
     * @returns {Strip[]}
     */
    get strips() {
        return this._strips;
    }

    /**
     * @param {Number} index
     * @returns {Strip | undefined}
     */
    getStrip(index) {
        return this._strips[index];
    }

    // SETTER
    /**
     * @param {Strip} strip
     */
    addStripToPage(strip) {
        this._strips.push(strip);
    }
}

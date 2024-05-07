import Strip from './Strip.js';

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

    // JSON transforms
    toJSON() {
        return JSON.stringify({
            strips: this.strips,
        });
    }

    static fromJSON(str) {
        let parsedStr = JSON.parse(str);
        let tempArr = [];
        parsedStr.strips.forEach((strip) => {
            tempArr.push(Strip.fromJSON(strip));
        });
        parsedStr.strips = tempArr;
        return parsedStr;
    }
}

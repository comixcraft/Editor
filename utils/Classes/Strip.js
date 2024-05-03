import Panel from './Panel.js';

export default class Strip {
    /** @type {Panel[]} */
    _panels;
    /** @type {Number} */
    _height;

    /**
     * @param {Number} height
     */
    constructor(height = null) {
        this._height = height ?? 0;
        this.#init();
    }

    #init() {
        this._panels = [];
    }

    // GETTERS
    /**
     * @returns {Panel[]}
     */
    get panels() {
        return this._panels;
    }

    /**
     * @returns {Number}
     */
    get height() {
        return this._height;
    }

    /**
     * @param {Number} index
     * @returns {Panel | undefined}
     */
    getPanel(index) {
        return this._panels[index];
    }

    // SETTERS
    /**
     * @param {Number} height
     */
    set height(height) {
        this._height = height;
    }

    /**
     * @param {Panel} panel
     */
    addPanelToStrip(panel) {
        this._panels.push(panel);
    }

    // JSON transforms
    toJSON() {
        return JSON.stringify({
            panels: this.panels,
            height: this.height,
        });
    }

    static fromJSON(str) {
        let parsedStr = JSON.parse(str);
        let tempArr = [];
        // parsedStr.panels is an array of [x] that need to change.
        parsedStr.panels.forEach((el, index) => {
            tempArr.push(Panel.fromJSON(el));
        });
        parsedStr.panels = tempArr;
        return parsedStr;
    }
}

export default class Strip {
    _panels;
    _height;

    constructor(height) {
        this._height = height;

        this.#init();
    }

    #init() {
        this._panels = [];
    }

    // GETTERS

    get panels() {
        return this._panels;
    }

    get height() {
        return this._height;
    }

    getPanel(index) {
        return this._panels[index];
    }

    // SETTERS

    set height(x) {
        this._height = x;
    }

    addPanelToStrip(panel) {
        this._panels.push(panel);
    }
}

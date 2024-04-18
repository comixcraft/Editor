export default class Strip {
    #panels;
    #height;

    constructor(height) {
        this.#height = height;

        this.#init();
    }

    #init() {
        this.#panels = [];
    }

    // GETTERS

    get panels() {
        return this.#panels;
    }

    get height() {
        return this.#height;
    }

    // SETTERS

    set height(x) {
        this.#height = x;
    }

    addPanelToStrip(panel) {
        this.#panels.push(panel);
    }
}

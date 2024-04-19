export default class Text {
    #content;
    #fontSize;
    #fontFamily;
    #fontWeight;

    constructor(content, fontSize) {
        this.#content = content;
        this.#fontSize = fontSize;
    }

    // GETTERS
    get content() {
        return this.#content;
    }
    get fontSize() {
        return this.#fontSize;
    }
    get fontFamily() {
        return this.#fontFamily;
    }
    get fontWeight() {
        return this.#fontWeight;
    }

    // SETTERS
    set content(c) {
        this.#content = c;
    }
    set fontSize(fS) {
        this.#fontSize = fS;
    }
    set fontFamily(fF) {
        this.#fontFamily = fF;
    }
    set fontWeight(fW) {
        this.#fontWeight = fW;
    }
}

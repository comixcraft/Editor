export default class Text {
    #name = 'Text';
    content;
    #fontSize;
    #fontFamily;
    #fontWeight;

    constructor(content, fontSize) {
        this.content = ref(content);
        this.#fontSize = fontSize;
        this.#fontFamily = 'Roboto';
        this.#fontWeight = '400';
    }

    // GETTERS
    getContent() {
        return this.content.value;
    }
    getFontSize() {
        return this.#fontSize;
    }
    getFontFamily() {
        return this.#fontFamily;
    }
    getFontWeight() {
        return this.#fontWeight;
    }
    getName() {
        return this.#name;
    }

    // SETTERS
    setContent(c) {
        this.content.value = c;
    }
    setFontSize(fS) {
        this.#fontSize = fS;
    }
    setFontFamily(fF) {
        this.#fontFamily = fF;
    }
    setFontWeight(fW) {
        this.#fontWeight = fW;
    }
}

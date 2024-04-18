
// ===================================================
// ********** Text
/**
 * @typedef {Object} Text
 * @property {string} content
 * @property {positiveNumber} fontSize
 * @property {"Roboto" | "Helvetica" | ...} fontFamily
 * @property {"bold" | "italic"} fontWeight
 */

export default class Text {
    #content;
    #fontSize;
    #fontFamily;
    #fontWeight;

    constructor(content, fontSize) {
        this.#content = content;
        this.#fontSize = fontSize
    }

    // GETTERS
    getContent() {
        return this.#content;
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

    // SETTERS
    setContent(c) {
        this.#content = c;
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
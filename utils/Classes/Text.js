export default class Text {
    /** @type {String} */
    _content;
    /** @type {Number} */
    _fontSize;
    /** @type {String} */
    _fontFamily = 'sans-serif';
    /** @type {Number} */
    _fontWeight = 400;

    /**
     * @param {String} content
     * @param {Number} fontSize
     */
    constructor(content = null, fontSize = null) {
        this._content = content ?? 'undefined';
        this._fontSize = fontSize ?? 16;
    }

    // GETTERS
    /** @returns {String} */
    get content() {
        return this._content;
    }

    /** @returns {Number} */
    get fontSize() {
        return this._fontSize;
    }

    /** @returns {String} */
    get fontFamily() {
        return this._fontFamily;
    }

    /** @returns {Number} */
    get fontWeight() {
        return this._fontWeight;
    }

    // SETTERS
    /** @param {String} content */
    set content(content) {
        this._content = content;
    }

    /** @param {Number} fontSize */
    set fontSize(fontSize) {
        this._fontSize = fontSize;
    }

    /** @param {String} fontFamily */
    set fontFamily(fontFamily) {
        this._fontFamily = fontFamily;
    }

    /** @param {Number} fontWeight */
    set fontWeight(fontWeight) {
        this._fontWeight = fontWeight;
    }
}

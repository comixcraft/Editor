export default class Text {
    _name = 'Text';
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
     * @param {Number} fontSize
     */
    constructor(content = null, fontSize = null, fontFamily = null) {
        this._content = content ?? 'undefined';
        this._fontSize = fontSize ?? 16;
        this._fontFamily = fontFamily;
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

    get name() {
        return this._name;
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

    // METHODS
    decreaseFontSize() {
        if (this._fontSize > 1) {
            this._fontSize--;
        }
    }

    increaseFontSize() {
        this._fontSize++;
    }
}

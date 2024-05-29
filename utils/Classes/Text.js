export default class Text {
    /** @type {String} */
    _name = 'Text';
    /** @type {String} */
    _content;
    /** @type {Number} */
    _fontSize;
    /** @type {String} */
    _fontFamily;
    /** @type {String} */
    _path = '/TextSymbol.png';
    /** @type {Number} */
    _fontWeight = 400;

    /**
     * @param {String} content
     * @param {Number} fontSize
     * @param {Number} fontFamily
     */
    constructor(content = null, fontSize = null, fontFamily = null) {
        this._content = content ?? 'undefined';
        this._fontSize = fontSize ?? 16;
        this._fontFamily = fontFamily ?? 'Nunito';
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

    /** @returns {String} */
    get name() {
        return this._name;
    }

    /** @returns {String} */
    get path() {
        return this._path;
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

    /** @param {String} content */
    set path(content) {
        this._path = content;
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

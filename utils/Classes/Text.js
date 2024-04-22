export default class Text {
    _content;
    _fontSize;
    _fontFamily;
    _fontWeight;

    constructor(content, fontSize) {
        this._content = content;
        this._fontSize = fontSize;
    }

    // GETTERS
    get content() {
        return this._content;
    }
    get fontSize() {
        return this._fontSize;
    }
    get fontFamily() {
        return this._fontFamily;
    }
    get fontWeight() {
        return this._fontWeight;
    }

    // SETTERS
    set content(c) {
        this._content = c;
    }
    set fontSize(fS) {
        this._fontSize = fS;
    }
    set fontFamily(fF) {
        this._fontFamily = fF;
    }
    set fontWeight(fW) {
        this._fontWeight = fW;
    }
}

export default class Text {
    _name = 'Text';
    _content;
    _fontSize;
    _fontFamily;
    _fontWeight;

    constructor(content, fontSize, fontFamily) {
        this._content = content;
        this._fontSize = fontSize;
        this._fontFamily = fontFamily;
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
    get name() {
        return this._name;
    }

    // SETTERS
    set content(c) {
        this._content = c;
    }
    increaseFontSize() {
        this._fontSize++;
    }
    set fontFamily(fF) {
        this._fontFamily = fF;
    }
    decreaseFontSize() {
        if (this._fontSize > 1) {
            this._fontSize--;
        }
    }

    set fontWeight(fW) {
        this._fontWeight = fW;
    }
}

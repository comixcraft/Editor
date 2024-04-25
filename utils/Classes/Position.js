export default class Position {
    /** @type {Number} */
    _x;
    /** @type {Number} */
    _y;

    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    // GETTERS
    /** @returns {Number} */
    get x() {
        return this._x;
    }

    /** @returns {Number} */
    get y() {
        return this._y;
    }

    /** @returns {{x: Number, y: Number}} */
    currPos() {
        return { x: this._x, y: this._y };
    }

    // SETTERS
    /** @param {Number} x */
    set x(x) {
        this._x = x;
    }

    /** @param {Number} y */
    set y(y) {
        this._y = y;
    }

    /**
     * @param {{x:Number, y:Number}} obj
     */
    definePos(obj) {
        this._x = obj.x;
        this._y = obj.y;
    }
}

export default class Position {
    _x;
    _y;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    // getter
    currPos = () => {
        return this._getCurrentPosition();
    };

    _getCurrentPosition() {
        return { x: this._x, y: this._y };
    }

    // setter
    definePos = (obj) => {
        return this._definePosition(obj);
    };

    _definePosition = (obj) => {
        this._x = obj.x;
        this._y = obj.y;
    };
}

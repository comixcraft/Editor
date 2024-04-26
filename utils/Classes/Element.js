import Position from './Position.js';

export default class ElementDS {
    _id;
    _z = 0;
    _pos = new Position(0, 0);
    _isFocused = false;
    _isMirrored = false;
    _rotation = 0;
    _width;
    _height;
    _src;
    _alt;
    _type;

    constructor(width = 0, height = 0, alt = 'unknown', src = 'undefined') {
        this._width = width;
        this._height = height;
        this._src = src;
        this._alt = alt;
    }

    currentState = () => {
        return {
            id: this._id,
            z: this._z,
            pos: this._pos,
            isFocused: this._isFocused,
            isMirrored: this._isMirrored,
            rotation: this._rotation,
            width: this._width,
            height: this._height,
            src: this._src,
            alt: this._alt,
        };
    };

    // GETTERS
    get id() {
        return this._id;
    }

    get z() {
        return this._z;
    }

    get pos() {
        return this._pos;
    }

    get isFocused() {
        return this._isFocused;
    }

    get isMirrored() {
        return this._isMirrored;
    }

    get rotation() {
        return this._rotation;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get src() {
        return this._src;
    }

    get alt() {
        return this._alt;
    }

    get type() {
        return this._type;
    }

    setPos = (obj) => {
        this._pos.definePos(obj);
    };

    setZIndex = (n) => {
        this._z = n;
    };

    setId = (n) => {
        this._id = n;
    };

    setIsMirrored = (bool) => {
        this._isMirrored = bool;
    };

    set focused(bool) {
        this._isFocused = bool;
    }

    setWidth = (width) => {
        this._width = width;
    };

    setHeight = (height) => {
        this._height = height;
    };
}

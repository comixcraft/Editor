import Position from './Position.js';

export default class ElementDS {
    _id;
    _z;
    _pos = new Position(0, 0);
    _isFocused = false;
    _isMirrored = false;
    _rotation = 0;
    _width;
    _height;
    _src;
    _alt;
    _type;

    constructor(width, height, alt, src) {
        this._width = width;
        this._height = height;
        this._src = src;
        this._alt = alt;
    }

    currentState = () => {
        return this._getCurrentState();
    };

    _getCurrentState() {
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

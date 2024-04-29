import Position from './Position.js';

export default class ElementDS {
    _id;
    _z;
    _pos = new Position(0, 0);
    _isFocused = false;
    _isMirroredHorizontal = false;
    _isMirroredVertical = false;
    _rotation = 0;
    _width;
    _height;
    _src;
    _alt;
    _type;

    constructor(width, height, alt, src, type) {
        this._width = width;
        this._height = height;
        this._src = src;
        this._alt = alt;
        this._type = type;
    }

    // getter
    currentState = () => {
        return this._getCurrentState();
    };

    _getCurrentState() {
        return {
            id: this._id,
            z: this._z,
            pos: this._pos,
            isFocused: this._isFocused,
            isMirroredHorizontal: this._isMirroredHorizontal,
            isMirroredVertical: this._isMirroredVertical,
            rotation: this._rotation,
            width: this._width,
            height: this._height,
            src: this._src,
            alt: this._alt,
            type: this._type,
        };
    }

    // setters
    setPos = (obj) => {
        this._pos.definePos(obj);
    };

    setZIndex = (n) => {
        this._z = n;
    };

    setId = (n) => {
        this._id = n;
    };

    setIsMirroredHorizontal = (bool) => {
        this._isMirroredHorizontal = bool;
    };

    setIsMirroredVertical = (bool) => {
        this._isMirroredVertical = bool;
    };

    setRotation = (n) => {
        this._rotation = n;
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

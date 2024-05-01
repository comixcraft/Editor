import Position from './Position.js';

export default class ElementDS {
    /** @type {String} */
    _id;
    /** @type {Number} */
    _z = 0;
    /** @type {Position} */
    _pos = new Position(0, 0);
    /** @type {Boolean} */
    _isFocused = false;
    /** @type {Boolean} */
    _isMirroredHorizontal = false;
    /** @type {Boolean} */
    _isMirroredVertical = false;
    /** @type {Number} */
    _rotation = 0;
    /** @type {Number} */
    _width;
    /** @type {Number} */
    _height;
    /** @type {String} */
    _src;
    /** @type {String} */
    _alt;
    /** @type {String} */
    _type;

    /**
     * @param {Number} width
     * @param {Number} height
     * @param {String} alt
     * @param {String} src
     * @param {String} type
     */
    constructor(width = null, height = null, alt = null, src = null, type = null) {
        this._width = width ?? 0;
        this._height = height ?? 0;
        this._src = src ?? 'undefined';
        this._alt = alt ?? 'unknown';
        this._type = type ?? 'Text';
    }

    /**
     * @returns {{id:String, z:Number, pos:Position, isFocused:Boolean, isMirroredHorizontal:Boolean, isMirroredVertical:Boolean, rotation:Number, width:Number, height:Number, src:String, alt:String, type:String}}
     */
    currentState = () => {
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
    };

    // GETTER
    /** @returns {String} */
    get id() {
        return this._id;
    }

    /** @returns {Number} */
    get z() {
        return this._z;
    }

    /** @returns {Position} */
    get pos() {
        return this._pos;
    }

    /** @returns {Boolean} */
    get isFocused() {
        return this._isFocused;
    }

    /** @returns {Boolean} */
    get isMirroredHorizontal() {
        return this._isMirroredHorizontal;
    }

    /** @returns {Boolean} */
    get isMirroredVertical() {
        return this._isMirroredVertical;
    }

    /** @returns {Number} */
    get rotation() {
        return this._rotation;
    }

    /** @returns {Number} */
    get width() {
        return this._width;
    }

    /** @returns {Number} */
    get height() {
        return this._height;
    }

    /** @returns {String} */
    get src() {
        return this._src;
    }

    /** @returns {String} */
    get alt() {
        return this._alt;
    }

    /** @returns {String} */
    get type() {
        return this._type;
    }

    // SETTERS
    set id(id) {
        this._id = id;
    }

    /** @param {Number} z */
    set z(z) {
        this._z = z;
    }

    /** @param {Position} pos */
    set pos(pos) {
        this._pos = pos;
    }

    /** @param {Boolean} isFocused */
    set isFocused(isFocused) {
        this._isFocused = isFocused;
    }

    /** @param {Boolean} isMirroredHorizontal */
    set isMirroredHorizontal(isMirroredHorizontal) {
        this._isMirroredHorizontal = isMirroredHorizontal;
    }

    /** @param {Boolean} isMirroredVertical */
    set isMirroredVertical(isMirroredVertical) {
        this._isMirroredVertical = isMirroredVertical;
    }

    /** @param {Number} rotation */
    set rotation(rotation) {
        this._rotation = rotation;
    }

    /** @param {Number} width */
    set width(width) {
        this._width = width;
    }

    /** @param {Number} height */
    set height(height) {
        this._height = height;
    }

    /** @param {String} src */
    set src(src) {
        this._src = src;
    }

    /** @param {String} alt */
    set alt(alt) {
        this._alt = alt;
    }

    /** @param {String} type */
    set type(type) {
        this._type = type;
    }

    /** @param {{x:Number, y:Number}} */
    setPos = (obj) => {
        this._pos.definePos(obj);
    };

    /**
     * @param {Number} z
     */
    setZIndex = (z) => {
        this._z = z;
    };

    /**
     * @param {Number} id
     */
    setId = (id) => {
        this._id = id;
    };

    /**
     * @param {Boolean} isMirroredHorizontal
     */
    setIsMirroredHorizontal = (isMirroredHorizontal) => {
        this._isMirroredHorizontal = isMirroredHorizontal;
    };

    /**
     * @param {Boolean} isMirroredVertical
     */
    setIsMirroredVertical = (isMirroredVertical) => {
        this._isMirroredVertical = isMirroredVertical;
    };

    /**
     * @param {Boolean} isFocused
     */
    set focused(isFocused) {
        this._isFocused = isFocused;
    }

    /**
     * @param {Number} width
     */
    setWidth = (width) => {
        this._width = width;
    };

    /**
     * @param {Number} height
     */
    setHeight = (height) => {
        this._height = height;
    };

    /**
     * @param {Number} rotation
     */
    setRotation = (rotation) => {
        this._rotation = rotation;
    };
}

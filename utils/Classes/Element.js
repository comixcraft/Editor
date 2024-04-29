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
    _isMirrored = false;
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
     * @returns {{id:String, z:Number, pos:Position, isFocused:Boolean, isMirrored:Boolean, rotation:Number, width:Number, height:Number, src:String, alt:String}
     */
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
    get isMirrored() {
        return this._isMirrored;
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
     * @param {Boolean} isMirrored
     */
    setIsMirrored = (isMirrored) => {
        this._isMirrored = isMirrored;
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
}

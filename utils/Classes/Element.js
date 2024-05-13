import Position from './Position.js';
import { v4 as uuidv4 } from 'uuid';

export default class ElementDS {
    /** @type {String} */
    _id;
    /** @type {Number} */
    _z = ref(0);
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
    constructor(width = null, height = null, alt = null, type = null) {
        this._width = width ?? 0;
        this._height = height ?? 0;
        this._alt = alt ?? 'unknown';
        this._type = type ?? 'Text';

        this.#init();
    }

    #init() {
        let myUuid = uuidv4();
        this.id = myUuid;
    }

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
        this._pos.x = pos.x;
        this._pos.y = pos.y;
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
    /** @param {String} alt */
    set alt(alt) {
        this._alt = alt;
    }

    /** @param {String} type */
    set type(type) {
        this._type = type;
    }

    /** @param {Boolean} isFocused */
    set focused(isFocused) {
        this._isFocused = isFocused;
    }

    toJSON = () => {
        return JSON.stringify({
            id: this.id,
            z: this.z,
            pos: this.pos,
            isFocused: this.isFocused,
            isMirroredHorizontal: this.isMirroredHorizontal,
            isMirroredVertical: this.isMirroredVertical,
            rotation: this.rotation,
            width: this.width,
            height: this.height,
            src: this.src,
            alt: this.alt,
            type: this.type,
        });
    };
}

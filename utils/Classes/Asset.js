import { v4 as uuidv4 } from 'uuid';

export default class Asset {
    /** @type {String} */
    _name = 'Asset';
    /** @type {String} */
    _path;
    /** @type {String} */
    _id;
    /** @naturalWidth {Number} */
    _naturalWidth;
    /** @naturalHeight {Number} */
    _naturalHeight;

    /**
     * @param {String} path
     */
    constructor(path = null, naturalWidth = null, naturalHeight = null) {
        this._path = path ?? 'undefined';
        this._id = uuidv4();
        this._naturalWidth = naturalWidth ?? 0;
        this._naturalHeight = naturalHeight ?? 0;
    }

    // GETTERS
    /** @returns {String} */
    get path() {
        return this._path;
    }

    /** @returns {String} */
    get id() {
        return this._id;
    }

    /** @returns {String} */
    get name() {
        return this._name;
    }
    /** @returns {Number} */
    get naturalWidth() {
        return this._naturalWidth;
    }
    /** @returns {Number} */
    get naturalHeight() {
        return this._naturalHeight;
    }

    // SETTERS
    /** @param {String} path */
    set path(path) {
        this._path = path;
    }
}

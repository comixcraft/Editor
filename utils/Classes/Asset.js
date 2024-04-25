import { v4 as uuidv4 } from 'uuid';

export default class Asset {
    /** @type {String} */
    _path;
    /** @type {String} */
    _id;

    /**
     * @param {String} path
     */
    constructor(path = 'undefined') {
        this._path = path;
        this._id = uuidv4();
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

    // SETTERS
    /** @param {String} path */
    set path(path) {
        this._path = path;
    }
}

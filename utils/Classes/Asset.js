import { v4 as uuidv4 } from 'uuid';

export default class Asset {
    /** @type {String} */
    _name = 'Asset';
    /** @type {String} */
    _path;
    /** @type {String} */
    _id;

    /**
     * @param {String} path
     */
    constructor(path = null) {
        this._path = path ?? 'undefined';
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

    /** @returns {String} */
    get name() {
        return this._name;
    }

    // SETTERS
    /** @param {String} path */
    set path(path) {
        this._path = path;
    }
}

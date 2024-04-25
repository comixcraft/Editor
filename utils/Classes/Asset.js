export default class Asset {
    /** @type {String} */
    _path;

    /**
     * @param {String} path
     */
    constructor(path = 'undefined') {
        this._path = path;
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

export default class Asset {
    _path;
    _id;

    constructor(path) {
        this._path = path;
    }

    // GETTERS
    get path() {
        return this._path;
    }

    get id() {
        return this._id;
    }

    // SETTERS
    set path(p) {
        this._path = p;
    }

    set id(id) {
        this._id = id;
    }
}

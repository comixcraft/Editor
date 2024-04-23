export default class Comic {
    _name;
    _title;
    _creatorName;
    _pages;

    constructor(name, title, creatorName) {
        this._name = name;
        this._title = title;
        this._creatorName = creatorName;
        this._pages = reactive([]);
    }

    // GETTER
    get name() {
        return this._name;
    }

    get title() {
        return this._title;
    }

    get creatorName() {
        return this._creatorName;
    }

    get pages() {
        return this._pages;
    }

    getPage(index) {
        return this._pages[index];
    }

    // SETTER
    set name(n) {
        this._name = n;
    }

    set title(t) {
        this._title = t;
    }

    set creatorName(cN) {
        this._creatorName = cN;
    }

    addPageToComic(page) {
        this.pages.push(page);
    }
}

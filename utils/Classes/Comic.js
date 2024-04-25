export default class Comic {
    /** @type {String} */
    _name;
    /** @type {String} */
    _title;
    /** @type {String} */
    _creatorName;
    /** @type {Page[]} */
    _pages;

    /**
     * @param {String} name
     * @param {String} title
     * @param {String} creatorName
     */
    constructor(name = 'undefined', title = 'undefined', creatorName = 'undefined') {
        this._name = name;
        this._title = title;
        this._creatorName = creatorName;
        this._pages = reactive([]);
    }

    // GETTER
    /**
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    /**
     * @returns {String}
     */
    get title() {
        return this._title;
    }

    /**
     * @returns {String}
     */
    get creatorName() {
        return this._creatorName;
    }

    /**
     * @returns {Page[]}
     */
    get pages() {
        return this._pages;
    }

    /**
     * @param {Number} index
     * @returns {Page | undefined}
     */
    getPage(index) {
        return this._pages[index];
    }

    // SETTER
    /**
     * @param {String} name
     */
    set name(name) {
        this._name = name;
    }

    /**
     * @param {String} title
     */
    set title(title) {
        this._title = title;
    }

    /**
     * @param {String} creatorName
     */
    set creatorName(creatorName) {
        this._creatorName = creatorName;
    }

    /**
     * @param {Page} page
     */
    addPageToComic(page) {
        this.pages.push(page);
    }
}

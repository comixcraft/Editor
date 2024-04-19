export default class Comic {
    #name;
    #title;
    #creatorName;
    #pages;

    constructor(name, title, creatorName) {
        this.#name = name;
        this.#title = title;
        this.#creatorName = creatorName;
    }

    // GETTER
    get name() {
        return this.#name;
    }

    get title() {
        return this.#title;
    }

    get creatorName() {
        return this.#creatorName;
    }

    get pages() {
        return this.#pages;
    }

    // SETTER
    set name(n) {
        this.#name = n;
    }

    set title(t) {
        this.#title = t;
    }

    set creatorName(cN) {
        this.#creatorName = cN;
    }

    addPageToComic(page) {
        this.#pages.push(page);
    }
}

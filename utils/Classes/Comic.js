// ********** Comic
/**
 * @typedef {Object} Comic
 * @property {name} projectname
 * @property {name | null} title 
 * @property {name | null} creatorname 
 * @property {page[]} pages 
 * page is another typedef
*/

export default class Comic {

    #name;
    #title;
    #creatorName;
    #pages;

    constructor (name, title, creatorName) {
        this.#name = name;

        this.#init(title, creatorName)
    }

    #init(title, creatorName) {
        this.#title = title;
        this.#creatorName = creatorName;

        this.#pages = [];
    }

    // GETTER
    get name() {
        return this.#name;
    }

    get title() {
        return this.#title
    }

    get creatorName() {
        return this.#creatorName
    }

    get page() {
        return this.#pages
    }

    // SETTER
    set name(n) {
        this.#name = n
    }

    set title(t) {
        this.#title = t
    }

    set creatorName(cN) {
        this.#creatorName = cN
    }

    addPageToComic(page) {
        this.#pages.push(page)
    }
}
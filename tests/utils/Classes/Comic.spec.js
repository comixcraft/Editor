import { describe, expect, it } from 'vitest';
import Comic from '~/utils/Classes/Comic.js';
import Page from '~/utils/Classes/Page.js';

describe('Comic', () => {
    it('creates an empty comic', () => {
        const sut = new Comic();

        expect(sut.name).toBe('undefined');
        expect(sut.title).toBe('undefined');
        expect(sut.creatorName).toBe('undefined');
        expect(sut.pages).toStrictEqual([]);
    });

    it('creates a comic with passed properties', () => {
        const sut = new Comic('name', 'title', 'creatorName');

        expect(sut.name).toBe('name');
        expect(sut.title).toBe('title');
        expect(sut.creatorName).toBe('creatorName');
        expect(sut.pages).toStrictEqual([]);
    });

    it('adds a page to the comic', () => {
        const sut = new Comic();
        const page1 = new Page();
        const page2 = new Page();

        sut.addPageToComic(page1);
        sut.addPageToComic(page2);

        expect(sut.pages).toStrictEqual([page1, page2]);
        expect(sut.getPage(0)).toStrictEqual(page1);
        expect(sut.getPage(1)).toStrictEqual(page2);
        expect(sut.pages.length).toBe(2);
    });
});

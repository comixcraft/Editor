import { describe, expect, it } from 'vitest';
import Page from '~/utils/Classes/Page.js';
import Strip from '~/utils/Classes/Strip.js';

describe('Comic', () => {
    it('creates an empty page', () => {
        const sut = new Page();

        expect(sut.strips).toStrictEqual([]);
    });

    it('adds a strip to the page', () => {
        const sut = new Page();
        const strip1 = new Strip(10);
        const strip2 = new Strip(20);

        sut.addStripToPage(strip1);
        sut.addStripToPage(strip2);

        expect(sut.strips).toStrictEqual([strip1, strip2]);
        expect(sut.getStrip(0)).toStrictEqual(strip1);
        expect(sut.getStrip(1)).toStrictEqual(strip2);
        expect(sut.strips.length).toBe(2);
    });
});

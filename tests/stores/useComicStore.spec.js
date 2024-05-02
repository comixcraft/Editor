import { describe, expect, it, beforeEach } from 'vitest';
import Text, { useComicStore } from '~/stores/useComicStore.js';
import { createPinia, setActivePinia } from 'pinia';

describe('useComicStore', () => {
    let pinia;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
    });

    it('default comic is an empty comic', () => {
        const sut = useComicStore();

        expect(sut.comic.name).toBe('undefined');
        expect(sut.comic.title).toBe('undefined');
        expect(sut.comic.creatorName).toBe('undefined');
        expect(sut.comic.pages).toStrictEqual([]);
    });

    it('creates an empty comic', () => {
        const sut = useComicStore();

        sut.createComicWithConfig({});

        expect(sut.comic.name).toBe('undefined');
        expect(sut.comic.title).toBe('undefined');
        expect(sut.comic.creatorName).toBe('undefined');
        expect(sut.comic.pages).toHaveLength(1);
        expect(sut.comic.getPage(0).strips).toHaveLength(1);
        expect(sut.comic.getPage(0).getStrip(0).height).toBe(0);
        expect(sut.comic.getPage(0).getStrip(0).panels).toHaveLength(0);
    });

    it('creates a comic without a Panel', () => {
        const sut = useComicStore();

        sut.createComicWithConfig({ height: 524, panels: [] });

        expect(sut.comic.name).toBe('undefined');
        expect(sut.comic.name).toBe('undefined');
        expect(sut.comic.creatorName).toBe('undefined');
        expect(sut.comic.pages).toHaveLength(1);
        expect(sut.comic.getPage(0).strips).toHaveLength(1);
        expect(sut.comic.getPage(0).getStrip(0).height).toBe(524);
        expect(sut.comic.getPage(0).getStrip(0).panels).toHaveLength(0);
    });

    it('creates a comic with one Panel', () => {
        const sut = useComicStore();

        sut.createComicWithConfig({ height: 524, panels: [{ width: 380, border: 'border' }] });

        expect(sut.comic.name).toBe('undefined');
        expect(sut.comic.name).toBe('undefined');
        expect(sut.comic.creatorName).toBe('undefined');
        expect(sut.comic.pages).toHaveLength(1);
        expect(sut.comic.getPage(0).strips).toHaveLength(1);
        expect(sut.comic.getPage(0).getStrip(0).height).toBe(524);
        expect(sut.comic.getPage(0).getStrip(0).panels).toHaveLength(1);
        expect(sut.comic.getPage(0).getStrip(0).getPanel(0).width).toBe(380);
        expect(sut.comic.getPage(0).getStrip(0).getPanel(0).border).toBe('border');
    });

    it('creates a comic with multiple Panels', () => {
        const sut = useComicStore();

        sut.createComicWithConfig({
            height: 524,
            panels: [
                { width: 776, border: 'border' },
                { width: 380, border: 'border' },
            ],
        });

        expect(sut.comic.name).toBe('undefined');
        expect(sut.comic.name).toBe('undefined');
        expect(sut.comic.creatorName).toBe('undefined');
        expect(sut.comic.pages).toHaveLength(1);
        expect(sut.comic.getPage(0).strips).toHaveLength(1);
        expect(sut.comic.getPage(0).getStrip(0).height).toBe(524);
        expect(sut.comic.getPage(0).getStrip(0).panels).toHaveLength(2);
        expect(sut.comic.getPage(0).getStrip(0).getPanel(0).width).toBe(776);
        expect(sut.comic.getPage(0).getStrip(0).getPanel(0).border).toBe('border');
        expect(sut.comic.getPage(0).getStrip(0).getPanel(1).width).toBe(380);
        expect(sut.comic.getPage(0).getStrip(0).getPanel(0).border).toBe('border');
    });
});

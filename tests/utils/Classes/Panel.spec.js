import { describe, expect, it } from 'vitest';
import Panel from '~/utils/Classes/Panel.js';
import ElementDS from '~/utils/Classes/Element.js';

describe('Panel', () => {
    it('creates an empty panel', () => {
        const sut = new Panel();

        expect(sut.width).toBe(0);
        expect(sut.border).toBe('undefined');
        expect(sut.elements).toStrictEqual(new Map());
    });

    it('creates a panel with values', () => {
        const sut = new Panel(100, 'border');

        expect(sut.width).toBe(100);
        expect(sut.border).toBe('border');
        expect(sut.elements).toStrictEqual(new Map());

        expect(sut.currentState()).toStrictEqual({
            border: 'border',
            elements: new Map(),
            width: 100,
        });
    });

    it('adds an element to the panel', () => {
        const sut = new Panel();
        const element1 = new ElementDS(10, 20, 'alt', 'src');
        const element2 = new ElementDS(20, 30, 'alt', 'src');

        sut.addElement(element1);
        sut.addElement(element2);

        expect(sut.getElement(element1.id)).toStrictEqual(element1);
        expect(sut.getElement(element2.id)).toStrictEqual(element2);

        expect(sut.elements.size).toBe(2);
    });

    it('removes an element from the panel', () => {
        const sut = new Panel();
        const element1 = new ElementDS(10, 20, 'alt', 'src');
        const element2 = new ElementDS(20, 30, 'alt', 'src');

        sut.addElement(element1);
        sut.addElement(element2);

        expect(sut.elements.size).toBe(2);

        sut.deleteElement(element1.id);

        expect(sut.elements.size).toBe(1);
    });

    it('gets the next possible z-index', () => {
        const sut = new Panel();
        const element1 = new ElementDS(10, 20, 'alt', 'src');
        const element2 = new ElementDS(20, 30, 'alt', 'src');
        const element3 = new ElementDS(30, 40, 'alt', 'src');
        const element4 = new ElementDS(40, 50, 'alt', 'src');
        const element5 = new ElementDS(50, 60, 'alt', 'src');

        sut.addElement(element1);
        sut.addElement(element2);
        sut.addElement(element3);
        sut.addElement(element4);
        sut.addElement(element5);

        sut.getHighestZIndex(6);
    });
});

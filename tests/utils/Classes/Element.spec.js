import { describe, expect, it } from 'vitest';
import Element from '~/utils/Classes/Element.js';
import Position from '~/utils/Classes/Position.js';

describe('Element', () => {
    it('creates an empty Element', () => {
        const sut = new Element();

        expect(sut.id).toBe(undefined);
        expect(sut.z).toBe(0);
        expect(sut.pos).toBeDefined();
        expect(sut.pos.x).toBe(0);
        expect(sut.pos.y).toBe(0);
        expect(sut.isFocused).toBe(false);
        expect(sut.isMirrored).toBe(false);
        expect(sut.rotation).toBe(0);
        expect(sut.width).toBe(0);
        expect(sut.height).toBe(0);
        expect(sut.src).toBe('undefined');
        expect(sut.alt).toBe('unknown');
        expect(sut.type).toBe('Text');
    });

    it('creates an Element with passed properties', () => {
        const sut = new Element(300, 400, 'alt', 'src', 'Asset');

        expect(sut.id).toBe(undefined);
        expect(sut.z).toBe(0);
        expect(sut.pos).toBeDefined();
        expect(sut.pos.x).toBe(0);
        expect(sut.pos.y).toBe(0);
        expect(sut.isFocused).toBe(false);
        expect(sut.isMirrored).toBe(false);
        expect(sut.rotation).toBe(0);
        expect(sut.width).toBe(300);
        expect(sut.height).toBe(400);
        expect(sut.src).toBe('src');
        expect(sut.alt).toBe('alt');
        expect(sut.type).toBe('Asset');
    });

    it('sets the Element position', () => {
        const sut = new Element();

        sut.setPos({ x: 100, y: 200 });

        expect(sut.pos.x).toBe(100);
        expect(sut.pos.y).toBe(200);
    });

    it('returns a JSON representation of the Element', () => {
        const sut = new Element();

        expect(sut.currentState()).toStrictEqual({
            id: undefined,
            z: 0,
            pos: new Position(0, 0),
            isFocused: false,
            isMirrored: false,
            rotation: 0,
            width: 0,
            height: 0,
            src: 'undefined',
            alt: 'unknown',
            type: 'Text',
        });
    });
});

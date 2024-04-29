import { describe, expect, it } from 'vitest';
import Text from '~/utils/Classes/Text.js';

describe('Text', () => {
    it('creates an empty text', () => {
        const sut = new Text();

        expect(sut.content).toBe('undefined');
        expect(sut.fontSize).toBe(16);
        expect(sut.fontFamily).toBe('Nunito');
        expect(sut.fontWeight).toBe(400);
        expect(sut.name).toBe('Text');
    });

    it('creates a text with passed properties', () => {
        const sut = new Text('content', 20);

        expect(sut.content).toBe('content');
        expect(sut.fontSize).toBe(20);
        expect(sut.fontFamily).toBe('Nunito');
        expect(sut.fontWeight).toBe(400);
        expect(sut.name).toBe('Text');
    });

    it('increases the font size', () => {
        const sut = new Text('content', 20);

        sut.increaseFontSize();

        expect(sut.fontSize).toBe(21);
    });

    it('decreases the font size', () => {
        const sut = new Text('content', 20);

        sut.decreaseFontSize();

        expect(sut.fontSize).toBe(19);
    });

    it('oes not decrease the font size if already at 1', () => {
        const sut = new Text('content', 1);

        sut.decreaseFontSize();

        expect(sut.fontSize).toBe(1);
    });
});

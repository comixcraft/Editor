import { describe, expect, it } from 'vitest';
import Text from '~/utils/Classes/Text.js';

describe('Text', () => {
    it('creates an empty text', () => {
        const sut = new Text();

        expect(sut.content).toBe('undefined');
        expect(sut.fontSize).toBe(16);
        expect(sut.fontFamily).toBe('sans-serif');
        expect(sut.fontWeight).toBe(400);
    });

    it('creates a text with passed properties', () => {
        const sut = new Text('content', 20);

        expect(sut.content).toBe('content');
        expect(sut.fontSize).toBe(20);
        expect(sut.fontFamily).toBe('sans-serif');
        expect(sut.fontWeight).toBe(400);
    });
});

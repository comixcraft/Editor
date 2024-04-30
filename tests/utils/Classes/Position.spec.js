import { describe, expect, it } from 'vitest';
import Position from '~/utils/Classes/Position.js';

describe('Position', () => {
    it('creates an empty position', () => {
        const sut = new Position();

        expect(sut.x).toBe(0);
        expect(sut.y).toBe(0);
    });

    it('creates a position with passed properties', () => {
        const sut = new Position(100, 50);

        expect(sut.x).toBe(100);
        expect(sut.y).toBe(50);
    });

    it('defines a position after initialisation', () => {
        const sut = new Position(0, 0);
        sut.definePos({ x: 100, y: 50 });

        expect(sut.currPos()).toStrictEqual({ x: 100, y: 50 });
    });
});

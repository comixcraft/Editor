import { describe, expect, it } from 'vitest';
import ElementDS from '~/utils/Classes/Element.js';

describe('Element', () => {
    it('creates an element with passed and default properties', () => {
        const sut = new ElementDS(0.2, 0.5, 'Image description', 'example.png');

        const currentSutState = sut.currentState();

        expect(currentSutState).hasOwnProperty('id');
        expect(currentSutState).hasOwnProperty('z');
        expect(currentSutState).hasOwnProperty('pos');
        expect(currentSutState).hasOwnProperty('isFocused');
        expect(currentSutState).hasOwnProperty('isMirrored');
        expect(currentSutState).hasOwnProperty('rotation');
        expect(currentSutState).hasOwnProperty('width');
        expect(currentSutState).hasOwnProperty('height');
        expect(currentSutState).hasOwnProperty('src');
        expect(currentSutState).hasOwnProperty('alt');

        expect(currentSutState.id).toBe(1);
        expect(currentSutState.z).toBe(1);
        expect(currentSutState.isFocused).toBe(false);
        expect(currentSutState.isMirrored).toBe(false);
        expect(currentSutState.rotation).toBe(0);
        expect(currentSutState.width).toBe(0.2);
        expect(currentSutState.height).toBe(0.5);
        expect(currentSutState.src).toBe('example.png');
        expect(currentSutState.alt).toBe('Image description');
    });
});

import { describe, expect, it } from 'vitest';
import Asset from '~/utils/Classes/Asset.js';

describe('Asset', () => {
    it('creates an empty asset', () => {
        const sut = new Asset();

        expect(sut.path).toBe('undefined');
        expect(sut.id).toBeDefined();
    });

    it('creates an asset with passed properties', () => {
        const sut = new Asset('path');

        expect(sut.path).toBe('path');
        expect(sut.id).toBeDefined();
    });
});

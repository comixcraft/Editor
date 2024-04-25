import { describe, expect, it } from 'vitest';
import Strip from '~/utils/Classes/Strip.js';
import Panel from '~/utils/Classes/Panel.js';

describe('Comic', () => {
    it('creates an empty strip', () => {
        const sut = new Strip();

        expect(sut.height).toBe(0);
        expect(sut.panels).toStrictEqual([]);
    });

    it('creates a strip with values', () => {
        const sut = new Strip(100);

        expect(sut.height).toBe(100);
        expect(sut.panels).toStrictEqual([]);
    });

    it('adds a panel to the strip', () => {
        const sut = new Strip();
        const panel1 = new Panel(10);
        const panel2 = new Panel(20);

        sut.addPanelToStrip(panel1);
        sut.addPanelToStrip(panel2);

        expect(sut.panels).toStrictEqual([panel1, panel2]);
        expect(sut.getPanel(0)).toStrictEqual(panel1);
        expect(sut.getPanel(1)).toStrictEqual(panel2);
        expect(sut.panels.length).toBe(2);
    });
});

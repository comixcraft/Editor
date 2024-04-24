// FIXME: The used height and width arenot the actual (highest) resolution of the image.
//  Needs to be adjusted, when the canvas can be created dynamically.

export default [
    {
        title: 'Single',
        preview: '/frames/preview/Preview_Single.png',
        config: { height: 524, panels: [{ width: 380, border: '/frames/Frame-Single.png' }] },
    },
    {
        title: 'Double',
        preview: '/frames/preview/Preview_Double.png',
        config: { height: 524, panels: [{ width: 776, border: '/frames/Frame-Double.png' }] },
    },
    {
        title: 'Triple',
        preview: '/frames/preview/Preview_Triple.png',
        config: { height: 524, panels: [{ width: 1164, border: '/frames/Frame-Triple.png' }] },
    },
];

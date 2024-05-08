// FIXME: The used height and width arenot the actual (highest) resolution of the image.
//  Needs to be adjusted, when the canvas can be created dynamically.

export default [
    {
        title: 'Three Single',
        preview: '/frames/preview/Preview_Single-Single-Single.png',
        config: {
            height: 524,
            panels: [
                { width: 380, border: '/frames/Frame-Single.png' },
                { width: 380, border: '/frames/Frame-Single.png' },
                { width: 380, border: '/frames/Frame-Single.png' },
            ],
        },
    },
    // {
    //     title: 'Double and Single',
    //     preview: '/frames/preview/Preview_Double-Single.png',
    //     config: {
    //         height: 524,
    //         panels: [
    //             { width: 776, border: '/frames/Frame-Double.png' },
    //             { width: 380, border: '/frames/Frame-Single.png' },
    //         ],
    //     },
    // },
    // {
    //     title: 'Single and Double',
    //     preview: '/frames/preview/Preview_Single-Double.png',
    //     config: {
    //         height: 524,
    //         panels: [
    //             { width: 380, border: '/frames/Frame-Single.png' },
    //             { width: 776, border: '/frames/Frame-Double.png' },
    //         ],
    //     },
    // },
    {
        title: 'Two Single',
        preview: '/frames/preview/Preview_Single-Single.png',
        config: {
            height: 524,
            panels: [
                { width: 380, border: '/frames/Frame-Single.png' },
                { width: 380, border: '/frames/Frame-Single.png' },
            ],
        },
    },
];

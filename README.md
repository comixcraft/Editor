# comixcraft - Editor

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Development

### Setup

Make sure to install the dependencies:

```bash
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

### Testing

To test the application, run the following command:

```bash
npm run test
```

## Style Guide

The font used for the **comixcraft**-Editor is _Nunito_, it is the default for everything.
Any text in the comics themselves is in the font _Pangolin_ (`.text-comic`).

For icons the rounded _Material Symbols_ are used (npm-package: material-symbols).
All available icons can be found in the [catalogue](https://fonts.google.com/icons).
Any icon can be used by providing its name as a ligature in `snake_case`.

```html
<span class="icon">comic_bubble</span> <span class="material-symbols-rounded">comic_bubble</span>
```

Only colors that are defined in `./assets/scss/_variables.scss` should be used.
This also applies to spacers, borders, and other design elements.
When you need any new size or a setting that might be used multiple times,
always define it in the `_variables.scss` file.

## Hosting
The content of this repository is hosted on https://comixcraft.com/ over [Netlify](https://www.netlify.com/).
Updates on the website are done automatically on update of the `main`-branch.

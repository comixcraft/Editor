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

## Updating the catalog
The catalog-structure is defined in `server/assets/comixplain-catalog.js`. 
This catalog follows the same structure as in the [Comixplain repository](https://github.com/fhstp/comixplain/blob/main/docs/assets.json).
The structure in the `comixplain-catalog.js` is used to generate the catalog on the website. 
The naming of categories, sub-categories and filters all originate from this catalog, 
therefore it is important that all keys carry readable names.

### Updating the catalog with a new version from the Comixplain repository
This paragraph describes how the existing catalog structure from the Comixplain repository most be adjusted to 
properly work for comixcraft.

1. Add the JSON-structure from the Comixplain repository (`/docs/assets.json`) to be 
exported in `comixplain-catalog.js`.
2. Remove the category with the key `Template` from the catalog. 
The data provided in this category is not usable in comixcraft.
3. Over Strg+F and Strg+R replace all occurrences of `.png"` with `"`.
This provides better alt-texts for the images.
4. Over Strg+F and Strg+R replace all occurrences of `https://github.com/fhstp/comixplain/blob/main/Comixplain_Assets` with `/catalog`.
This provides relative urls.
5. If new images were added update the `public/catalog`-folder with the new images.
6. If new categories or sub-categories were added please add/adapt the corresponding icons 
in `config/iconsConfig.js` ith the icons-name from [Material Symbols](https://fonts.google.com/icons)

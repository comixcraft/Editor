# Comixcraft

![Comic Image](/public/comic-image@2x.png#center)
<h3 style="text-align: center;">Words are good, pictures are better.</h3>


## Description

Comics are a powerful way to bring stories to life and can even support student engagement in learning complex scientific subjects. With our user-friendly platform, anyone can become a comic creator – no artistic skills required!

</br>
<div class="flex-row">

![St Polten Logo](https://showcase.comixcraft.com/pictures/fh-logo.png#smallimg)

Comixcraft is a project developed at St. Pölten University of Applied Sciences (FHSTP), Austria with the assets from [Comixplain](https://fhstp.github.io/comixplain/).
</div>

</br>

<div class="flex-row">

[1.2.4-beta
](https://github.com/comixcraft/Editor/releases/latest)

<p class="pill">latest</p>
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/d11fb4f4-f8fa-447c-b483-7ddc4d93c542/deploy-status)](https://app.netlify.com/sites/admirable-mandazi-f47990/deploys)

## Authors and acknowledgment

<div class='author-display'>

![Anna Blasinger](https://avatars.githubusercontent.com/u/92300733?v=4#avatar)

**Anna Blasinger**

<div class="socials">

*[[Github]](https://github.com/Annacc211018)*

*[[Linkedin]](https://www.linkedin.com/in/anna-blasinger-3ba0a52bb/)*
</div>
</div>

<div class='author-display'>

![Florent Gabillon](https://avatars.githubusercontent.com/u/85215120?v=4#avatar)

**Florent Gabillon**

<div class="socials">

*[[Github]](https://github.com/esitsolf)*

*[[Linkedin]](https://www.linkedin.com/in/florent-gabillon-2709b8194/)*
</div>
</div>

<div class='author-display'>

![Alic Holla](https://avatars.githubusercontent.com/u/55839005?v=4#avatar)

**Alica Holla**

<div class="socials">

*[[Github]](https://github.com/hollaa)*

*[[Linkedin]](https://www.linkedin.com/in/alica-holla/)*
</div>
</div>

<div class='author-display'>

![Vanessa Koeck](https://avatars.githubusercontent.com/u/47862956?v=4#avatar)

**Vanessa Koeck**

<div class="socials">

*[[Github]](https://github.com/Vanessi-K)*

*[[Linkedin]](https://www.linkedin.com/in/vanessa-k%C3%B6ck-42a265244/?original_referer=https%3A%2F%2Fshowcase.comixcraft.com%2F)*
</div>
</div>

<div class='author-display'>

![Juliana Matsumura](https://avatars.githubusercontent.com/u/107397144?v=4#avatar)

**Juliana Matsumura**

<div class="socials">

*[[Github]](https://github.com/moonjuko)*

*[[Linkedin]](https://www.linkedin.com/in/juliana-matsumura/)*
</div>
</div>

<div class='author-display'>

![Antoine Muneret](https://avatars.githubusercontent.com/u/92710938?v=4#avatar)

**Antoine Muneret**

<div class="socials">

*[[Github]](https://github.com/AntoinouM)*

*[[Linkedin]](https://www.linkedin.com/in/antoine-muneret-5b81b9123/?original_referer=https%3A%2F%2Fshowcase.comixcraft.com%2F)*
</div>
</div>

<div class='author-display'>

![Hannah Wagner](https://avatars.githubusercontent.com/u/92428401?v=4#avatar)

**Hannah Wagner**

<div class="socials">

*[[Github]](https://github.com/hannahwagner1402)*

*[[Linkedin]](https://www.linkedin.com/in/hannah-wagner-4b9328268/)*
</div>
</div>


<ins>Special thanks to</ins> [Gausszhou](https://github.com/gausszhou) and is [vue-drag-resize-rotate](https://github.com/gausszhou/vue-drag-resize-rotate) plugin.



## How does it works

![demo](https://showcase.comixcraft.com/pictures/promo_video.gif#left)


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


## Contributing

Contributing
If you want to contribute to a project and make it better, your help is very welcome. Contributing is also a great way to learn more about social coding on Github, new technologies and and their ecosystems and how to make constructive, helpful bug reports, feature requests and the noblest of all contributions: a good, clean pull request.

### How to make a clean pull request
Look for a project's contribution instructions. If there are any, follow them.

- Create a personal fork of the project on Github.
- Clone the fork on your local machine. Your remote repo on Github is called ```origin```.
- Add the original repository as a remote called ```upstream```.
- If you created your fork a while ago be sure to pull upstream changes into your local repository.
- Create a new branch to work on! Branch from ```develop``` if it exists, else from ```master```.
- Implement/fix your feature, comment your code.
- Follow the code style of the project, including indentation.
- If the project has tests run them!
- Write or adapt tests as needed.
- Add or change the documentation as needed.
- Squash your commits into a single commit with git's [interactive rebase](https://help.github.com/articles/interactive-rebase). Create a new branch if necessary.
- Push your branch to your fork on Github, the remote ```origin```.
- From your fork open a pull request in the correct branch. Target the project's ```develop``` branch if there is one, else go for ```master```!
- If the maintainer requests further changes just push them to your branch. The PR will be updated automatically.
- Once the pull request is approved and merged you can pull the changes from ```upstream``` to your local repo and delete your extra branch(es).

And last but not least: Always write your commit messages in the present tense. Your commit message should describe what the commit, when applied, does to the code – not what you did to the code.

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
The following steps describe how the existing catalog structure from the Comixplain repository most be adjusted to 
properly work for comixcraft.

1. Copy the JSON-structure from the Comixplain repository (`/docs/assets.json`) 
and paste it into `comixplain-catalog.js`. The structure needs to be a named export.
```javascript
export const catalog = {
    /* structure goes here */
}
```
2. Remove the category with the key `Template` from the catalog. 
The data provided in this category is not usable in comixcraft.
3. Over Strg+F and Strg+R replace all occurrences of `.png"` with `"`.
This provides better alt-texts for the images.
4. Over Strg+F and Strg+R replace all occurrences of `https://github.com/fhstp/comixplain/blob/main/Comixplain_Assets` with `/catalog`.
This provides relative urls.
5. If new images were added update the `public/catalog`-folder with the new images.
6. If new categories or sub-categories were added please add/adapt the corresponding icons 
in `config/iconsConfig.js` ith the icons-name from [Material Symbols](https://fonts.google.com/icons)






## License
Under Attribution-ShareAlike 4.0 International license. [More details about this license]('/LICENSE.md')

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

<style>
    img[src$="#avatar"] {
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        max-width: 30px;
    }   

    img[src$="#center"] {
        display: block;
        margin: 0 auto;
        max-width: 400px;
    }        
    
    img[src$="#left"] {
        display: block;
        margin: 0 10px;
        max-width: 400px;
    }    
    
    img[src$="#smallimg"] {
        display: block;
        width: 80px;
    }

    .pill {
        border-radius: 16px;
        width: fit-content;
        color: #45fa1e;
        border: 1px solid #45fa1e;
        padding: 0 20px
    }

    .author-display {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 15px
    }

    .socials {
        display: flex;
        gap: 5px;
    }

    .flex-row {
        display: flex;
        gap: 5px;
    }

</style>
import {catalog} from "~/server/assets/comixplain-catalog.js";

const whitelistCategories = {
    'characters': 'Characters',
    'speech-bubbles': 'Speech Bubbles',
    'scenes': 'Scenes',
    'annotation-elements': 'Annotation Elements',
}

const whitelistSubCategories = {
    'facial-expressions': 'Facial Expressions',
    'single': 'Single',
    'multiple': 'Multiple',
    'full-bubbles': 'Full Bubbles',
    'half-bubbles': 'Half Bubbles',
    'background': 'Background',
    'items': 'Items',
    'arrows': 'Arrows',
    'circles': 'Circles',
    'rectangles': 'Rectangles',
    'lines': 'Lines',
    'others': 'Others',
}

export default defineEventHandler(async (event) => {
    let catalogAssets = [];

    const body = await readBody(event)

    // Category
    let categories = body.category;
    if (!Array.isArray(categories)) {
        categories = [categories];
    }

    categories = categories.map((c) => whitelistCategories[c] ? whitelistCategories[c] : null);
    categories = categories.filter((c) => c !== null);

    let categoryKeys = [];
    if (categories.length > 0) {
        categoryKeys = categories;
    } else {
        categoryKeys = Object.values(whitelistCategories);
    }

    // SubCategory
    let subCategories = body.subCategory;
    if (!Array.isArray(subCategories)) {
        subCategories = [subCategories];
    }

    subCategories = subCategories.map((c) => whitelistSubCategories[c] ? whitelistSubCategories[c] : null);
    subCategories = subCategories.filter((c) => c !== null);

    let subCategoryKeys = [];
    if (subCategories.length > 0) {
        subCategoryKeys = subCategories;
    } else {
        subCategoryKeys = Object.values(whitelistSubCategories);
    }

    // Filter
    let filter = body.filter;

    if (!filter) {
        filter = [];
    }

    if (!Array.isArray(filter)) {
        filter = [filter];
    }

    for (const categoryKey of categoryKeys) {
        for (const [subCategoryKey, subCategoryValue] of Object.entries(catalog[categoryKey])) {
            if (subCategoryKeys.includes(subCategoryKey)) {

                if (filter.length === 0) {
                    catalogAssets = catalogAssets.concat(subCategoryValue.assets);
                }

                for (const asset of subCategoryValue.assets) {
                    let keywords = asset.keywords;
                    keywords = keywords + ' ' + asset.name;

                    let assetFilter = filter.filter((f) => keywords.toLowerCase().includes(f.toLowerCase()));
                    if (assetFilter.length > 0) {
                        catalogAssets.push(asset);
                    }
                }
            }
        }
    }

    return catalogAssets;
})
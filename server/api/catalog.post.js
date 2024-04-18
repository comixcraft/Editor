import { catalog } from '~/server/assets/comixplain-catalog.js';

/* Post parameters:
 * category: string or array of strings - categories of the comixplain catalog in all lowercase and with a dash instead of a whitespace
 * subCategory: string or array of strings - subcategories of the comixplain catalog in all lowercase and with a dash instead of a whitespace
 * filter: string or array of strings - terms to filter the assets by name or keywords (case insensitive) - multiple terms are combined with an OR operator
 */

export default defineEventHandler(async (event) => {
    let catalogAssets = [];

    const body = await readBody(event);
    console.log('body', body);

    // Category
    let categories = body.category;

    if (!categories) {
        categories = [];
    }

    if (!Array.isArray(categories)) {
        categories = [categories];
    }

    // categories = categories.map((c) => {
    //     if (typeof c !== 'string') {
    //         return null;
    //     }
    //     let categoryParts = c.split('-');
    //     categoryParts = categoryParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
    //     return categoryParts.join(' ');
    // });

    // SubCategory
    let subCategories = body.subCategory;

    if (!subCategories) {
        subCategories = [];
    }

    if (!Array.isArray(subCategories)) {
        subCategories = [subCategories];
    }

    // subCategories = subCategories.map((c) => {
    //     if (typeof c !== 'string') {
    //         return null;
    //     }
    //     let subCategoryParts = c.split('-');
    //     subCategoryParts = subCategoryParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
    //     return subCategoryParts.join(' ');
    // });

    // Filter
    let filter = body.filter;

    if (!filter) {
        filter = [];
    }

    if (!Array.isArray(filter)) {
        filter = [filter];
    }

    for (const [categoryKey, categoryValue] of Object.entries(catalog)) {
        if (categories.length > 0 && !categories.includes(categoryKey)) {
            continue;
        }

        for (const [subCategoryKey, subCategoryValue] of Object.entries(catalog[categoryKey])) {
            if (subCategories.length > 0 && !subCategories.includes(subCategoryKey)) {
                continue;
            }

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

    return catalogAssets;
});

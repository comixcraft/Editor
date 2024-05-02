import { catalog } from '~/server/assets/comixplain-catalog.js';

/* Post parameters:
 * category: string or array of strings - categories of the comixplain catalog in all lowercase and with a dash instead of a whitespace
 * subCategory: string or array of strings - subcategories of the comixplain catalog in all lowercase and with a dash instead of a whitespace
 * filter: string or array of strings - terms to filter the assets by name or keywords (case insensitive) - multiple terms are combined with an OR operator
 */

export default defineEventHandler(async (event) => {
    let catalogAssets = [];

    const body = await readBody(event);

    // Category
    let categories = body.category;

    if (!categories) {
        categories = [];
    }

    if (!Array.isArray(categories)) {
        categories = [categories];
    }

    // SubCategory
    let subCategories = body.subCategory;

    if (!subCategories) {
        subCategories = [];
    }

    if (!Array.isArray(subCategories)) {
        subCategories = [subCategories];
    }

    // Filter
    let filter = body.filter;

    if (!filter) {
        filter = [];
    }

    if (!Array.isArray(filter)) {
        filter = [filter];
    }

    filter = filter.map((term) => term.toLowerCase());

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
                continue;
            }

            for (const asset of subCategoryValue.assets) {
                if (includesAll(asset.keywords, filter)) {
                    catalogAssets.push(asset);
                }
            }
        }
    }

    return catalogAssets;
});

function includesAll(arr, values) {
    return values.every((v) => arr.toString().includes(v));
}

import { catalog } from '~/server/assets/comixplain-catalog.js';

export default defineEventHandler(() => {
    let catalogStructure = {
        categories: [],
    };

    for (const [categoryKey, categoryValue] of Object.entries(catalog)) {
        const subCategories = [];

        for (const [subCategoryKey, subCategoryValue] of Object.entries(catalog[categoryKey])) {
            subCategories.push({
                name: subCategoryKey,
                filter: subCategoryValue['filter-options'],
            });
        }

        catalogStructure.categories.push({
            name: categoryKey,
            subCategories: subCategories,
        });
    }

    return catalogStructure;
});

import {catalogue} from "~/server/assets/comixplain-catalogue.js";

export default defineEventHandler(() => {
    let catalogueAssets = [];
    for (const [categoryKey, categoryValue] of Object.entries(catalogue)) {
        for (const [subCategoryKey, subCategoryValue] of Object.entries(categoryValue)) {
            catalogueAssets = catalogueAssets.concat(subCategoryValue.assets);
        }
    }

    return catalogueAssets;
})
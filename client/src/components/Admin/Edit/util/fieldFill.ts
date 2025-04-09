import { AssetAllVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";

export function adminAssetFieldFill(asset: AssetAllVO, fields: AssetEditFieldStates) {
    fields.title[1](asset.title);
    fields.shortDesc[1](asset.shortDesc || '');
    fields.description[1](asset.description || '');
    fields.fileLink[1](asset.downloadUrl || '');
    fields.storeLink[1](asset.platformUrl || '');
    fields.platform[1](asset.platform);
    fields.artist[1](asset.publisher || '');
    fields.supports[1](asset.supports);
    fields.images[1](asset.images.map(v => ({
        local: false,
        ...v
    })));


    // 등록일
    let createAtField = "";
    if (asset.publishAt) {
        const publishAtDate = new Date(asset.publishAt);
        createAtField = `${publishAtDate.getFullYear()}-${(publishAtDate.getMonth() + 1).toString().padStart(2, '0')}-${publishAtDate.getDate().toString().padStart(2, '0')}`;
    }

    fields.createAt[1](createAtField);

    let categoryField: number | null = null;

    if (asset.category && asset.category.length > 0) {
        const item = asset.category[asset.category.length - 1]; // 마지막꺼
        categoryField = item.id;
    }
    
    fields.category[1](categoryField);
}
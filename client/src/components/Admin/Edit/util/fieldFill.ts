import { AssetAllVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";

export function adminAssetFieldFill(asset: AssetAllVO, fields: AssetEditFieldStates) {
    fields.title[1](asset.title);
    fields.shortDesc[1](asset.shortDesc || '');
    fields.description[1](asset.description || '');
    fields.fileLink[1](asset.downloadUrl);
    fields.storeLink[1](asset.platformUrl || '');
    fields.platform[1](asset.platform);
    fields.artist[1](asset.publisher || '');
    fields.supports[1](asset.supports);

    // 등록일
    if (asset.publishAt) {
        const publishAtDate = new Date(asset.publishAt);
        fields.createAt[1](`${publishAtDate.getFullYear()}-${(publishAtDate.getMonth() + 1).toString().padStart(2, '0')}-${publishAtDate.getDate().toString().padStart(2, '0')}`);
    }
}
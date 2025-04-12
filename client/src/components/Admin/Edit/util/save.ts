import { AssetAllVO, AssetBaseVO, AssetEditFormDTO, ThumbnailVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";
import { ReactState } from "@domiTypes/react";
import { getAssetEditFieldUpdatedKeys } from "./diffField";
import { request } from "@utils/request";

export async function saveAdminEditAsset(assetId: number, fields: AssetEditFieldStates, [ origin, setOrigin ]: ReactState<AssetAllVO | null>) {
    if (origin === null) return;

    const otherFields = new Set<keyof AssetEditFieldStates>(getAssetEditFieldUpdatedKeys(fields, origin) as (keyof AssetEditFieldStates)[]);
    
    const body: AssetEditFormDTO = {
        id: assetId
    };

    if (otherFields.has("title")) {
        body.title = fields.title[0];
    }

    if (otherFields.has("shortDesc")) {
        body.shortDesc = fields.shortDesc[0];
    }

    if (otherFields.has("description")) {
        body.description = fields.description[0];
    }

    if (otherFields.has("fileLink")) {
        body.downloadUrl = fields.fileLink[0];
    }

    if (otherFields.has("storeLink")) {
        body.platformUrl = fields.storeLink[0];
    }

    if (otherFields.has("platform")) {
        let platform: AssetBaseVO['platform'] | "" = fields.platform[0];
        if (platform === null)
            platform = "";

        body.platform = platform;
    }

    if (otherFields.has("artist")) {
        body.publisher = fields.artist[0];
    }

    if (otherFields.has("createAt")) {
        body.publishAt = fields.createAt[0];
    }

    if (otherFields.has("supports")) {
        body.supports = fields.supports[0];
    }

    if (otherFields.has("category")) {
        body.category = fields.category[0] || -1;
    }

    if (otherFields.has("images")) {
        const result: Partial<ThumbnailVO>[] = [];
        
        for (const thumbnail of fields.images[0]) {
            let content: string | undefined = thumbnail.contentUrl;
            let preview: string | undefined = thumbnail.previewUrl;

            if (thumbnail.local) {
                if (thumbnail.type === 'Image')
                    content = undefined;

                preview = undefined;
            }
            
            result.push({
                type: thumbnail.type,
                contentUrl: content,
                previewUrl: preview
            });
        }

        body.images = result;
    }

    if (otherFields.has("version")) {
        // ...
    }

    const response = await request("asset/admin/edit", { method: "POST", data: body });
    
}
import { AssetAllVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";
import { ReactState } from "@domiTypes/react";

export function hasAssetEditFieldUpdated(fields: AssetEditFieldStates, origin: AssetAllVO): boolean {
    // console.log(fields.title[0], origin.title)
    // 제목 비교
    if (!isOtherField(fields.title, origin.title)) return true;
    if (!isOtherField(fields.shortDesc, origin.shortDesc)) return true;
    if (!isOtherField(fields.description, origin.description)) return true;
    if (!isOtherField(fields.fileLink, origin.downloadUrl)) return true;
    if (!isOtherField(fields.storeLink, origin.platformUrl)) return true;
    if (fields.platform[0] !== origin.platform) return true;
    if (!isOtherField(fields.artist, origin.publisher)) return true;

    return false;
}

function isOtherField(state: ReactState<string>, origin: string | null | undefined) {
    return state[0] === (origin || '');
}
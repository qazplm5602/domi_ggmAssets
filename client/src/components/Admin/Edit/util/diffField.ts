import { AssetAllVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";

export function hasAssetEditFieldUpdated(fields: AssetEditFieldStates, origin: AssetAllVO): boolean {
    console.log(fields.title[0], origin.title)
    // 제목 비교
    if (fields.title[0] !== origin.title)
        return true;

    // 간략 설명
    if (fields.shortDesc[0] !== origin.shortDesc)
        return true;

    // 설명ㄴ
    if (fields.description[0] !== origin.description)
        return true;

    // 다운로드 링크
    // if (fields.fileLink[0] !== origin.)

    return false;
}
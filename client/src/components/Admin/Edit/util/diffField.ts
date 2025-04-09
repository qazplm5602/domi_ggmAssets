import { AssetAllVO, CompatibilityVO } from "@domiTypes/asset";
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

    // 등록일 비교
    if ((fields.createAt[0] !== "" &&  origin.publishAt === null) || (fields.createAt[0] === "" && origin.publishAt !== null)) {
        return true;
    }
    
    // 등록일이 똑같은지 바교 ㅁㄴㅇㄹ
    if (fields.createAt[0] !== "" && origin.publishAt !== null) {
        const originDate = new Date(origin.publishAt);
        const currentDate = new Date(fields.createAt[0]);
        
        // 날짜가 다르네잉
        if (originDate.getFullYear() !== currentDate.getFullYear() || originDate.getMonth() !== currentDate.getMonth() || originDate.getDate() !== currentDate.getDate())
            return true;
    }

    // 호환성 비교
    if (otherSupportsField(fields.supports[0], origin.supports))
        return true;

    // 카테고리 비교
    // 서로 같으면 null === null 임 (널널하다)
    if (fields.category[0] !== origin.category) {
        if ((fields.category[0] === null && origin.category !== null) || fields.category[0] !== null && origin.category === null) {
            return true;
        } else if (origin.category !== null) {
            const lastId = origin.category[origin.category.length - 1].id;
            
            if (fields.category[0] !== lastId)
                return true;
        }
    }

    return false;
}

function isOtherField(state: ReactState<string>, origin: string | null | undefined) {
    return state[0] === (origin || '');
}

function otherSupportsField(source: CompatibilityVO[], target: CompatibilityVO[]) {
    if (source.length !== target.length) return true; // 길이가 다른거부터 다름

    for (let i = 0; i < source.length; i++) {
        const value1 = source[i];
        const value2 = target[i];

        if (value1.version !== value2.version || value1.builtIn !== value2.builtIn || value1.urp !== value2.urp || value1.hdrp !== value2.hdrp)
            return true;
    }

    return false;
}
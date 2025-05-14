import { AssetAllVO, CompatibilityVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";
import { ReactState } from "@domiTypes/react";

// 비교 함수들 ㅁㄴㅇㄹ
const diffHandlers: { [K in keyof AssetEditFieldStates]: (fields: AssetEditFieldStates, origin: AssetAllVO) => boolean } = {
    title: (fields, origin) => !isOtherField(fields.title, origin.title),
    shortDesc: (fields, origin) => !isOtherField(fields.shortDesc, origin.shortDesc),
    description: (fields, origin) => !isOtherField(fields.description, origin.description),
    fileLink: (fields, origin) => !isOtherField(fields.fileLink, origin.downloadUrl),
    storeLink: (fields, origin) => !isOtherField(fields.storeLink, origin.platformUrl),
    platform: (fields, origin) => fields.platform[0] !== origin.platform,
    artist: (fields, origin) => !isOtherField(fields.artist, origin.publisher),
    createAt: (fields, origin) => { // 등록일이 똑같은지 바교 ㅁㄴㅇㄹ
        if ((fields.createAt[0] !== "" && origin.publishAt === null) || (fields.createAt[0] === "" && origin.publishAt !== null)) {
            return true;
        }
        if (fields.createAt[0] !== "" && origin.publishAt !== null) { // 날짜가 다르네잉
            const originDate = new Date(origin.publishAt);
            const currentDate = new Date(fields.createAt[0]);
            return originDate.getFullYear() !== currentDate.getFullYear() ||
                originDate.getMonth() !== currentDate.getMonth() ||
                originDate.getDate() !== currentDate.getDate();
        }
        return false;
    },
    supports: (fields, origin) => otherSupportsField(fields.supports[0], origin.supports), // 호환성 비교
    category: (fields, origin) => { // 카테고리 비교
        if (fields.category[0] !== origin.category) {
            // 서로 같으면 null === null 임 (널널하다)
            if ((fields.category[0] === null && origin.category !== null) || (fields.category[0] !== null && origin.category === null)) {
                return true;
            } else if (origin.category !== null) {
                const lastId = origin.category[origin.category.length - 1].id;
                return fields.category[0] !== lastId;
            }
        }
        return false;
    },
    images: (fields, origin) => { // 썸네일 비교
        if (fields.images[0].length !== origin.images.length) return true; // 갯수가 다름
        for (let i = 0; i < origin.images.length; i++) {
            const currentThumbnail = fields.images[0][i];
            const originThumbnail = origin.images[i];
            if (currentThumbnail.local || // 서버에 안올라가있으면 그냥 저장 해야하지롱
                currentThumbnail.type !== originThumbnail.type ||
                currentThumbnail.contentUrl !== originThumbnail.contentUrl ||
                currentThumbnail.previewUrl !== originThumbnail.previewUrl) {
                return true;
            }
        }
        return false;
    },
    version: () => false, // 버전은 아직 서버에 없엉
    fileSize: (fields, origin) => {
        if ((fields.fileSize[0] === "" && origin.fileSize !== null) || (fields.fileSize[0] !== "" && origin.fileSize === null))
            return true;


        return Number(fields.fileSize[0]) !== Number(origin.fileSize);
    },
    fileVersion: (fields, origin) => !isOtherField(fields.fileVersion, origin.fileVersion),
    storeVersion: (fields, origin) => !isOtherField(fields.storeVersion, origin.storeVersion),
}

export function hasAssetEditFieldUpdated(fields: AssetEditFieldStates, origin: AssetAllVO): boolean {
    return Object.keys(fields).some(k => diffHandlers[k as keyof AssetEditFieldStates](fields, origin));
}

export function getAssetEditFieldUpdatedKeys(fields: AssetEditFieldStates, origin: AssetAllVO) {
    return Object.keys(fields).filter(k => diffHandlers[k as keyof AssetEditFieldStates](fields, origin));
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
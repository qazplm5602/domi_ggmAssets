import { AssetAllVO, AssetBaseVO, AssetEditFormDTO, ThumbnailVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";
import { ReactState } from "@domiTypes/react";
import { getAssetEditFieldUpdatedKeys } from "./diffField";
import { request } from "@utils/request";
import { adminAssetEditLoad } from "./loadAsset";

export async function saveAdminEditAsset(assetId: number, fields: AssetEditFieldStates, [ origin, setOrigin ]: ReactState<AssetAllVO | null>) {
    if (origin === null) return;

    const otherFields = new Set<keyof AssetEditFieldStates>(getAssetEditFieldUpdatedKeys(fields, origin) as (keyof AssetEditFieldStates)[]);
    const sendImageFiles: File[] = [];

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
                if (thumbnail.type === 'Image') {
                    content = undefined;
                    
                    if (thumbnail.contentFile) // 여기 위치가 제일 ㄹ중요함 (안맞으면 서버랑 조짐)
                        sendImageFiles.push(thumbnail.contentFile);
                }

                preview = undefined;
                if (thumbnail.previewFile)
                    sendImageFiles.push(thumbnail.previewFile);
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

    const response = await request<string[]>("asset/admin/edit", { method: "POST", data: body });
    

    // 이미지 보내야지ㅣㅣㅣㅣ
    if (sendImageFiles.length > 0) {
        const uploadKeys = response.data;
        
        if (uploadKeys.length !== sendImageFiles.length) {
            throw new Error("전송 파일 개수와 필요한 파일 개수가 다릅니다.");
        }

        await batchImageUpload(sendImageFiles, uploadKeys);
    }

    await adminAssetEditLoad(assetId.toString(), { alive: true }, fields, setOrigin);
}

const BATCH_MAX = 4; // 최대 4개 동시에 ㄱㄴ

function batchImageUpload(files: File[], handles: string[]): Promise<void> {
    return new Promise(resolve => {
        const status: { [ key: number ]: boolean } = {};

        const runUpload = function(idx: number) {
            status[idx] = false; // 로딩즁

            const form = new FormData();
            form.append("file", files[idx]);

            request("asset/admin/thumbnail", { method: "POST", data: form, params: { id: handles[idx] } })
            .finally(() => {
                status[idx] = true;
                finishUpload();
            });
        }
        
        const finishUpload = function() {
            // 일 찾기 ㄱㄱㄱㄱ
            let allFinished = true;
            for (let i = 0; i < files.length; i++) {
                if (status[i] === undefined) {
                    runUpload(i);
                    return;
                }

                if (status[i] === false)
                    allFinished = false;
            }

            // 여기까지 왔다면 할 일이 없지롱
            if (allFinished)
                resolve(); // 다함 ㅅㄱ
        }

        if (files.length === 0) {
            resolve(); // 할일이 없는데슝
            return;
        }

        for (let i = 0; i < Math.min(files.length, BATCH_MAX); i++) {
            runUpload(i);
        }
    });
}
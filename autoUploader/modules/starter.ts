import { AssetFileItem } from "./asset.ts";
import { findStoreURL } from "./search.ts";
import { assetUpload } from "./upload.ts";

export async function uploadStart(item: AssetFileItem) {
    const storeURL = await findStoreURL(item.name, item.domain);
    if (!storeURL) {
        console.warn(`${item.id} 찾을 수 없음.`);
        return; // 머야 검색 결과에도 없네
    }

    await assetUpload(item, storeURL);
}
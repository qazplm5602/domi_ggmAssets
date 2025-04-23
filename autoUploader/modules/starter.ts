import { AssetFileItem } from "./asset.ts";
import { findStoreURL } from "./search.ts";
import { assetUpload } from "./upload.ts";

export async function uploadStart(item: AssetFileItem) {
    const storeURL = await findStoreURL(item.name, item.domain);
    await assetUpload(item, storeURL);
}
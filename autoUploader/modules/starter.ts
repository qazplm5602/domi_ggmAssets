import { AssetFileItem } from "./asset";
import { findStoreURL } from "./search";
import { assetUpload } from "./upload";

export async function uploadStart(item: AssetFileItem) {
    const storeURL = await findStoreURL(item.name, item.domain);
    await assetUpload(item, storeURL);
}
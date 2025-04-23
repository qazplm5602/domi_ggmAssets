import { AssetFileItem } from "./asset.ts";

const UPLOAD_URL = process.env.UPLOAD_URL || '';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';
const DOWNLOAD_URL = process.env.DOWNLOAD_URL || '';

export async function assetUpload(item: AssetFileItem, store: string) {
    const cookie = `accessToken=${ACCESS_TOKEN}`;
    const body = {
        download: DOWNLOAD_URL.replace('{0}', item.id),
        store,
        platform: item.platform
    };

    const result = await fetch(UPLOAD_URL, { method: "POST", headers: { "Cookie": cookie, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    console.log(item.id, result.status);
}
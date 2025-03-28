import { CrawlerCallbackType, registerPlatformHandler } from "./crawler.ts";
import { DomiError } from "./error.ts";
import { getIdByUnityStoreUrl } from "./linkParse.ts";

const unityAssetDataLoadhandler: CrawlerCallbackType = async function(req) {
    const url = req.body?.url;
    
    if (!url) {
        throw new DomiError(400, "invalid url");
    }

    const assetId = getIdByUnityStoreUrl(url);

    return { id: assetId };
}

registerPlatformHandler("unity", unityAssetDataLoadhandler);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import { CrawlerCallbackType, registerPlatformHandler } from "./crawler.ts";
import { DomiError } from "./error.ts";

const unityAssetDataLoadhandler: CrawlerCallbackType = async function(req) {
    const url = req.body?.url;
    
    if (!url) {
        throw new DomiError(400, "invalid url");
    }

    return {};
}

registerPlatformHandler("unity", unityAssetDataLoadhandler);
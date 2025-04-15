import { AssetDTO } from "./asset.ts";
import { CrawlerCallbackType, registerPlatformHandler } from "./crawler.ts";

const itchioDataLoadHandler: CrawlerCallbackType = async function(req) {
    const itchUrl = req.body.url;

    return {} as AssetDTO; // 아직 머가 없엉 (테스트)
}

registerPlatformHandler("itchio", itchioDataLoadHandler);
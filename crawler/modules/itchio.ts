import { AssetDTO } from "./asset.ts";
import { CrawlerCallbackType, registerPlatformHandler } from "./crawler.ts";
import { getItchioOwnerHost } from "./linkParse.ts";

const itchioDataLoadHandler: CrawlerCallbackType = async function(req) {
    const itchUrl = req.body.url;
    const ownerUrl = getItchioOwnerHost(itchUrl);

    

    return {} as AssetDTO; // 아직 머가 없엉 (테스트)
}

registerPlatformHandler("itchio", itchioDataLoadHandler);
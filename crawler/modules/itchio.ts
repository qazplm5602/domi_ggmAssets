import * as cheerio from "cheerio";
import { AssetDTO } from "./asset.ts";
import { CrawlerCallbackType, registerPlatformHandler } from "./crawler.ts";
import { getItchioOwnerHost } from "./linkParse.ts";

const itchioDataLoadHandler: CrawlerCallbackType = async function(req) {
    const itchUrl = req.body.url;
    const ownerUrl = getItchioOwnerHost(itchUrl);

    const response = await fetch(itchUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $(".game_title").text();
    const desc = $(".formatted_description.user_formatted").html();
    const shortDesc = $("meta[property=\"og:description\"]").attr("content");
    const publisher = $(".on_follow > .full_label").text().substring(("Follow ").length);


    return {
        title,
        desc,
        shortDesc,
        publisher
    } as AssetDTO; // 아직 머가 없엉 (테스트)
}

registerPlatformHandler("itchio", itchioDataLoadHandler);
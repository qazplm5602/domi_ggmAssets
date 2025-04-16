import * as cheerio from "cheerio";
import { AssetDTO, CompatibilityVO, ThumbnailVO } from "./asset.ts";
import { CrawlerCallbackType, registerPlatformHandler } from "./crawler.ts";
import { getItchioOwnerHost } from "./linkParse.ts";
import UrlPattern from "url-pattern";
import { DomiError } from "./error.ts";

const youtubeEmbedPattern = new UrlPattern("/embed/:id");

const itchioDataLoadHandler: CrawlerCallbackType = async function(req) {
    const itchUrl = req.body.url;
    const ownerUrl = getItchioOwnerHost(itchUrl);

    const response = await fetch(itchUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $(".game_title").text();
    if (!title)
        throw new DomiError(500, "not found asset title.");

    const desc = $(".formatted_description.user_formatted").html() || '';
    const shortDesc = $("meta[property=\"og:description\"]").attr("content") || null;
    const publisher = $(".on_follow > .full_label").text().substring(("Follow ").length) || '';
    const images: ThumbnailVO[] = [];

    // 유튭 임베드 찾기
    $(".video_embed iframe").each((idx, el) => {
        let url = $(el).attr("src");
        if (!url) return;
        
        if (!url.startsWith("http"))
            url = "https:" + url;

        const urlParse = URL.parse(url);
        if (!urlParse) return;

        const urlData = youtubeEmbedPattern.match(urlParse.pathname);
        if (!urlData) return;
        
        images.push({
            type: "Youtube",
            contentUrl: url,
            previewUrl: `https://img.youtube.com/vi/${urlData.id}/mqdefault.jpg`
        });
    });

    // 사진 찾긱
    $(".screenshot_list > a").each((_, el) => {
        const originUrl = $(el).attr("href");
        const smallUrl = $(el).find("img").attr("src");
        
        if (!originUrl || !smallUrl) return;

        images.push({
            type: "Image",
            contentUrl: originUrl,
            previewUrl: smallUrl
        });
    });

    return {
        title,
        desc,
        shortDesc,
        publisher,
        supports: [] as CompatibilityVO[],
        images,
        category: null,
        publishAt: null,
        size: null
    };
}

registerPlatformHandler("itchio", itchioDataLoadHandler);
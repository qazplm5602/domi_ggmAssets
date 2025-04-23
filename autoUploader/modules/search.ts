// import { getBrowser } from "./browser.ts";
import * as cheerio from 'cheerio';
import { AssetFileItem } from './asset.ts';

export async function findStoreURL(name: string, platform: AssetFileItem['platform'], acceptDomain: string): Promise<string | null> {
    // const browser = getBrowser();
    // const page = await browser.newPage();
    // await page.goto("https://www.bing.com/search?q=asdf");
    // page.close();

    // 생각 해보니 bing 은 브라우저로 안열어도 됨 ㄷㄷ
    const query = `q=${name}&pq=${name}`;
    const result = await fetch(`https://www.bing.com/search?q=${encodeURI(query)}`, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Whale/4.31.304.16 Safari/537.36" } });
    const html = await result.text();
    const $ = cheerio.load(html);

    let findUrl: string | null = null;

    $(".b_algo h2 > a").each((idx, el) => {
        const url = $(el).attr("href");
        if (!url) return;

        const urlParse = URL.parse(url);
        if (!urlParse) return;
        
        if (urlParse.host.endsWith(acceptDomain)) {
            console.log(`${name} check.`, url);

            // itch io 결제 페이지는 제외 해야함ㅁㅁㅁㅁㅁ
            if (platform === 'Itchio' && urlParse.pathname.split("/").length > 2) { // 경로가 왜 더 있냠
                console.log(`${name} nope.`);
                return;
            }

            findUrl = url;
            return false; // each 그만~~~
        }
    });

    return findUrl;
}
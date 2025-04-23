// import { getBrowser } from "./browser.ts";
import * as cheerio from 'cheerio';

export async function findStoreURL(name: string, acceptDomain: string): Promise<string | null> {
    // const browser = getBrowser();
    // const page = await browser.newPage();
    // await page.goto("https://www.bing.com/search?q=asdf");
    // page.close();

    // 생각 해보니 bing 은 브라우저로 안열어도 됨 ㄷㄷ
    const result = await fetch(`https://www.bing.com/search?q=${encodeURIComponent(name)}`);
    const html = await result.text();
    const $ = cheerio.load(html);

    let findUrl: string | null = null;

    $(".b_algo h2 > a").each((idx, el) => {
        const url = $(el).attr("href");
        if (!url) return;

        const urlParse = URL.parse(url);
        if (!urlParse) return;
        
        if (urlParse.host.endsWith(acceptDomain)) {
            findUrl = url;
            return false; // each 그만~~~
        }
    });

    return findUrl;
}
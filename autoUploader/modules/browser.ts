import puppeteer, { Browser } from 'puppeteer';

let browser: Browser | undefined;

export function getBrowser() {
    if (!browser)
        throw new Error("브라우저 없다");

    return browser;
}

export async function createBrowser() {
    browser = await puppeteer.launch({ headless: false });
}
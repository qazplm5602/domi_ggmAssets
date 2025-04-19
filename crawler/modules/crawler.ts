import { Request } from 'express-serve-static-core';
import { AssetDTO } from './asset.ts';

export type CrawlerCallbackType = (req: Request<{}, any, any, any, Record<string, any>>) => Promise<AssetDTO>;

const crawlerCalls: { [key: string]: CrawlerCallbackType } = {};

export function registerPlatformHandler(platform: string, cb: CrawlerCallbackType) {
    crawlerCalls[platform] = cb;
}

export function getPlatformHandler(platform: string): CrawlerCallbackType | undefined {
    return crawlerCalls[platform];
}
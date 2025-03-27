import { Request } from 'express-serve-static-core';
import { AssetDTO } from './asset.ts';

type CallbackType = (req: Request<{}, any, any, any, Record<string, any>>) => Promise<AssetDTO>;

const crawlerCalls: { [key: string]: CallbackType } = {};

export function registerPlatformHandler(platform: string, cb: CallbackType) {
    crawlerCalls[platform] = cb;
}

export function getPlatformHandler(platform: string): CallbackType | undefined {
    return crawlerCalls[platform];
}
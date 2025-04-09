import { AssetBaseVO, CompatibilityVO, ThumbnailVO } from "./asset";
import { ReactState } from "./react";

export interface AssetEditFieldStates {
    title: ReactState<string>,
    fileLink: ReactState<string>,
    storeLink: ReactState<string>,
    version: ReactState<string>,
    createAt: ReactState<string>,
    shortDesc: ReactState<string>,
    description: ReactState<string>,
    platform: ReactState<AssetBaseVO['platform']>,
    artist: ReactState<string>,
    supports: ReactState<CompatibilityVO[]>,
    category: ReactState<number | null>,
    images: ReactState<ThumbnailLocalVO[]>
}

export interface ThumbnailLocalVO extends ThumbnailVO {
    local: boolean,
    contentFile?: File,
    previewFile?: File
}
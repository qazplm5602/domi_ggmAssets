import { CategoryVO } from "./category"

export interface CompatibilityVO {
    version: string,
    builtIn: boolean,
    urp: boolean,
    hdrp: boolean
}

export interface ThumbnailVO {
    type: 'Youtube' | 'Image',
    contentUrl: string,
    previewUrl: string
}

export interface PageThumbnailVO {
    images: ThumbnailVO[],
    size: number
}

export interface AssetBaseVO {
    id: number,
    category: CategoryVO[] | null,
    title: string,
    publisher: string,
    platform: null | 'Unity' | 'Itchio'
}

export interface AssetDetailVO extends AssetBaseVO {
    shortDesc: string,
    description: string,
    supports: CompatibilityVO[],
    images: ThumbnailVO[],
    publishAt: string | null
}

export interface AssetAllVO extends AssetDetailVO {
    platformUrl: string | null,
    downloadUrl: string
}

export interface AssetPreviewVO extends AssetBaseVO {
    thumbnail: PageThumbnailVO
}

export interface AssetSearchOption {
    category: string,
    order: string,
    amount: string,
    page: string
}

export interface AssetEditFormDTO extends Omit<Partial<AssetAllVO>, "images" | "category" | "platform"> {
    images? : Partial<ThumbnailVO>[],
    category?: number,
    platform?: AssetBaseVO['platform'] | ""
}
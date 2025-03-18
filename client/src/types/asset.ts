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

export interface AssetBaseVO {
    category: string,
    title: string,
    publisher: string
}

export interface AssetDetailVO extends AssetBaseVO {
    shortDesc: string,
    description: string,
    supports: CompatibilityVO[],
    images: ThumbnailVO[]
}
export interface CompatibilityVO {
    version: string,
    builtIn: boolean
    urp: boolean
    hdrp: boolean
}

export interface ThumbnailVO {
    type: 'Image' | 'Youtube',
    contentUrl: string
    previewUrl: string
}

export interface AssetDTO {
    // id: number,
    title: string,
    desc: string,
    shortDesc: string | null,
    publisher: string,
    supports: CompatibilityVO[],
    images: ThumbnailVO[],
    publishAt: string | null,
    category: string | null,
    size: number | null
}

interface UnityStoreSrp {
    version: string,
    types: ('lightweight' | 'hd' | 'standard' | 'custom')[]
}

interface UnityAssetVersion {
    id: string,
    name: string,
    publishedDate: string
}

interface UnityPublisher {
    id: string,
    name: string,
}

interface UnityThumbnail {
    type: 'youtube' | 'screenshot',
    imageUrl: string,
    thumbnailUrl: string
}

interface UnityCategoy {
    id: string,
    name: string,
    slug: string,
    longName: string
}

export interface UnityStoreProduct {
    id: string,
    name: string,
    description: string,
    elevatorPitch: string,
    srps: UnityStoreSrp[],
    currentVersion: UnityAssetVersion,
    downloadSize: string,
    publisher: UnityPublisher
    images: UnityThumbnail[],
    category: UnityCategoy,
    firstPublishedDate: string,
    supportedUnityVersions: string[],
    // state: string,
    // overlay: string,
    // overlayText: string
}
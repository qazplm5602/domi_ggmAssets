export interface FavoriteTagVO {
    id: string,
    name: string,
    color: string
}


export interface FavoriteTagContextData {
    tags: FavoriteTagVO[] | null,
    setTags: React.Dispatch<React.SetStateAction<FavoriteTagVO[] | null>> | undefined,
    addCallRef: React.RefObject<(() => void) | null> | undefined,
    saveCallRef: React.RefObject<(() => Promise<void>) | null> | undefined
}

export type FavoriteTagDict = { [key: string]: FavoriteTagVO };
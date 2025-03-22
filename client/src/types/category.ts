export interface CategoryVO {
    id: number,
    name: string,
    parentId: number | null
}

export interface CategoryIndexing {
    dict: { [key: number]: CategoryVO },
    children: { [key: number]: Set<number> }
}
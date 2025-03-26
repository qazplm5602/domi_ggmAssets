export interface CategoryVO {
    id: number,
    name: string,
    parentId: number | null
}

export interface CategoryCountVO extends CategoryVO {
    count: number
}

export interface NodeIndexing<T> {
    dict: { [key: number]: T },
    children: { [key: number]: Set<number> }
}

export interface CategoryIndexing extends NodeIndexing<CategoryVO> {}
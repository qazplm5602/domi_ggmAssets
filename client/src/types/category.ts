export interface CategoryVO {
    id: number,
    name: string,
    parentId: number | null
}

export interface CategoryCountVO extends CategoryVO {
    count: number
}

export interface CategoryOptionDTO extends CategoryCountVO {
    local: boolean // 아직 서버에는 없고 클라에만 있음
}

export interface NodeIndexing<T> {
    dict: { [key: number]: T },
    children: { [key: number]: Set<number> }
}

export interface CategoryIndexing extends NodeIndexing<CategoryVO> {}

export interface AdminCategoryContextType {
    onChangeName: (id: number, value: string) => void,
    onRemove: (id: number) => void,
    onAdd: (parent: number) => void
}
import { CategoryVO, NodeIndexing } from "@domiTypes/category";
import { categoryDataIndex } from "@utils/category";

export function adminEditCategorySelectSearchFilter(search: string, categories: CategoryVO[]) {
    const result: CategoryVO[] = [];
    const categoryNodes = categoryDataIndex(categories);

    const alreadyIds = new Set<number>(); // 이미 들어가있는건 제외 해야함ㅁㅁㅁㅁ

    for (const category of categories) {
        if (alreadyIds.has(category.id)) continue; // 체크할 필요가 없지롱~~~~
        
        // 검색 찾았당당당당
        if (category.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            categoryParentAdd(result, categoryNodes, alreadyIds, category.id);
        }
    }

    return result;
}

function categoryParentAdd(result: CategoryVO[], nodes: NodeIndexing<CategoryVO>, alreadyIds: Set<number>, id: number) {
    if (alreadyIds.has(id)) return; // 이미 있지롱

    const category = nodes.dict[id];
    result.push(category);
    alreadyIds.add(category.id);

    // 부모 찾기
    if (category.parentId)
        categoryParentAdd(result, nodes, alreadyIds, category.parentId);
}
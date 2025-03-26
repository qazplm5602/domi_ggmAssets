import { CategoryVO, NodeIndexing } from "@domiTypes/category";

export function categoryDataIndex<T extends CategoryVO>(data: T[]): NodeIndexing<T> {
    const dict: NodeIndexing<T>['dict'] = {};
    const children: NodeIndexing<T>['children'] = {};

    for (const element of data) {
        dict[element.id] = element;
        
        if (element.parentId) {
            let tb = children[element.parentId];

            if (tb === undefined)
                children[element.parentId] = tb = new Set();
        
            tb.add(element.id);
        }
    }

    return { dict, children };
}
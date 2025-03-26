import { CategoryVO, NodeIndexing } from "@domiTypes/category";

export function categoryDataIndex<T extends CategoryVO>(data: T[]): NodeIndexing<T> {
    const dict: NodeIndexing<T>['dict'] = {};
    const children: NodeIndexing<T>['children'] = {
        [-1]: new Set()
    };

    for (const element of data) {
        dict[element.id] = element;
        
        const parentId = element.parentId || -1;
        let tb = children[parentId];

        if (tb === undefined)
            children[parentId] = tb = new Set();
    
        tb.add(element.id);
    }

    return { dict, children };
}
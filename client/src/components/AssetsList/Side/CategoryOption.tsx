import { useEffect, useMemo, useState } from "react";
import AssetsListSideBox from "../SideBox";
import AssetsListSideCategoryBox from "./CategoryBox";
import { CategoryIndexing, CategoryVO } from "@domiTypes/category";
import { AliveType } from "@domiTypes/alive";
import { request } from "@utils/request";

export default function AssetsListSideCategoryOption() {
    const [ data, setData ] = useState<CategoryVO[]>([]);
    const indexingData = useMemo<CategoryIndexing>(() => {
        const dict: CategoryIndexing['dict'] = {};
        const children: CategoryIndexing['children'] = {};

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
    }, [ data ]);
    const firstCategories = useMemo(() => data.filter(v => v.parentId === null), [ data ]);
    
    const onLoad = async function(aliveRef: AliveType) {
        const result = await request<CategoryVO[]>("asset/category");
        if (!aliveRef.alive) return;
        
        // 분류 되지 않은것도 포함
        result.data.push({
            id: -1,
            name: "분류되지 않음",
            parentId: null
        });

        setData(result.data);
    }

    useEffect(() => {
        const aliveRef = { alive: true };

        onLoad(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, []);

    return <AssetsListSideBox title="카테고리">
        {firstCategories.map((v, i) => <AssetsListSideCategoryBox key={v.id} my={v.id} depth={0} list={indexingData} idx={i + 1} />)}
    </AssetsListSideBox>
}
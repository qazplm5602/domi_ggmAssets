import { useFavoriteTagList } from "@components/Favorite/Tag/Context";
import AssetsListSideTagItem from "./Item";
import { useAssetSearchOption, useSetAssetSearchOption } from "@components/AssetsList/hook";
import { useEffect, useMemo } from "react";

export default function AssetsListSideTagList() {
    const [ tags ] = useFavoriteTagList();
    const { tag: selectTagArray } = useAssetSearchOption();
    const setSearchOption = useSetAssetSearchOption();
    const selectTags = useMemo(() => new Set(selectTagArray == '' ? [] : selectTagArray.split(",")), [ selectTagArray ]);

    const saveSelectTag = function() {
        const tagParam = Array.from(selectTags).join(",")
        setSearchOption({ tag: tagParam });
    }

    const handleTagToggle = function(id:string, active: boolean) {
        if (active)
            selectTags.add(id);
        else
            selectTags.delete(id);

        saveSelectTag();
    }

    // 태그 리스트 바뀜
    useEffect(() => {
        if (!tags) return;
        
        const indxedTags = new Set(tags.map(v => v.id));
        let changed = false;
        Array.from(selectTags).forEach(id => {
            if (!indxedTags.has(id)) { // 아니 이거 뭔 태그임;;
                selectTags.delete(id);
                changed = true;
            }
        });

        if (changed)
            saveSelectTag();
    }, [ tags ]);
    
    if (!tags)
        return null; // 로딩즁...

    return <>
        {tags.map(v => <AssetsListSideTagItem key={v.id} data={v} checked={selectTags.has(v.id)} onToggle={(active) => handleTagToggle(v.id, active)} />)}
    </>;
}
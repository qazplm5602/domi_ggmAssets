import { useFavoriteTagList } from "@components/Favorite/Tag/Context";
import AssetsListSideTagItem from "./Item";
import { useAssetSearchOption, useSetAssetSearchOption } from "@components/AssetsList/hook";
import { useMemo } from "react";

export default function AssetsListSideTagList() {
    const [ tags ] = useFavoriteTagList();
    const { tag: selectTagArray } = useAssetSearchOption();
    const setSearchOption = useSetAssetSearchOption();
    const selectTags = useMemo(() => new Set(selectTagArray == '' ? [] : selectTagArray.split(",")), [ selectTagArray ]);

    const handleTagToggle = function(id:string, active: boolean) {
        if (active)
            selectTags.add(id);
        else
            selectTags.delete(id);

        const tagParam = Array.from(selectTags).join(",")
        setSearchOption({ tag: tagParam });
    }
    
    if (!tags)
        return null; // 로딩즁...

    return <>
        {tags.map(v => <AssetsListSideTagItem key={v.id} data={v} checked={selectTags.has(v.id)} onToggle={(active) => handleTagToggle(v.id, active)} />)}
    </>;
}
import { useFavoriteTagList } from "@components/Favorite/Tag/Context";
import AssetsListSideTagItemEdit from "./ItemEdit";
import { useEffect, useState } from "react";
import { FavoriteTagVO } from "@domiTypes/favoriteTag";

export default function AssetsListSideTagListEdit() {
    const [ originTags ] = useFavoriteTagList(); // 진짜 적용되어있는거
    const [ localTags, setLocalTags ] = useState<FavoriteTagVO[] | null>(null); // 이건 수정 사항

    useEffect(() => {
        // 로딩 끗!!!!!
        if (localTags === null && originTags !== null)
            setLocalTags([ ...originTags ]);
    }, [ originTags ]);

    // 왜 없음
    if (localTags === null)
        return null;

    return <>
        {localTags.map(v => <AssetsListSideTagItemEdit key={v.id} data={v} />)}
    </>;
}
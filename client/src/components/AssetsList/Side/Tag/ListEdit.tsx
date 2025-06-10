import { favoriteTagContext, useFavoriteTagList } from "@components/Favorite/Tag/Context";
import AssetsListSideTagItemEdit from "./ItemEdit";
import { useContext, useEffect, useRef, useState } from "react";
import { FavoriteTagVO } from "@domiTypes/favoriteTag";
import { generateRandomString } from "@utils/misc";

type TagStateDict = { [key: string]: 'edit' | 'remove' | 'add' };

export default function AssetsListSideTagListEdit() {
    const [ originTags ] = useFavoriteTagList(); // 진짜 적용되어있는거
    const [ localTags, setLocalTags ] = useState<FavoriteTagVO[] | null>(null); // 이건 수정 사항
    const { addCallRef } = useContext(favoriteTagContext);
    const tagStateRef = useRef<TagStateDict>({});
    
    if (!addCallRef)
        throw new Error("아니 여기도 왜 Tag Providor이 없지???");

    // 태그 추가 콜백
    addCallRef.current = function() {
        if (!localTags) return;

        const id = `${generateRandomString(10)}-new`;
        const newItem = { id, color: "FF0000", name: "추강" };
        setLocalTags([ ...localTags, newItem ]);

        tagStateRef.current[id] = 'add';
    }

    const setAttributeLocalTag = function(id: string, data: Partial<FavoriteTagVO>) {
        const itemIdx = localTags?.findIndex(v => v.id === id) ?? -1;
        if (itemIdx < 0 || !localTags) return; // 왜 없냐

        const newList = [ ...localTags ];
        const item = { ...newList[itemIdx], ...data };
        
        newList.splice(itemIdx, 1, item);
        setLocalTags(newList);

        tagStateRef.current[id] = 'edit';
    }

    const handleChangeName = function(id: string, value: string) {
        setAttributeLocalTag(id, { name: value });
    }

    const handleChangeColor = function(id: string, color: string) {
        setAttributeLocalTag(id, { color });
    }

    const handleRemoveItem = function(id: string) {
        const itemIdx = localTags?.findIndex(v => v.id === id) ?? -1;
        if (itemIdx < 0 || !localTags) return;
        
        const newList = [ ...localTags ];
        newList.splice(itemIdx, 1);

        setLocalTags(newList);

        tagStateRef.current[id] = 'remove';
    }

    useEffect(() => {
        // 로딩 끗!!!!!
        if (localTags === null && originTags !== null)
            setLocalTags([ ...originTags ]);
    }, [ originTags ]);

    // 왜 없음
    if (localTags === null)
        return null;

    return <>
        {localTags.map(v => <AssetsListSideTagItemEdit key={v.id} data={v} onChangeName={name => handleChangeName(v.id, name)} onChangeColor={color => handleChangeColor(v.id, color)} onRemove={() => handleRemoveItem(v.id)} />)}
    </>;
}
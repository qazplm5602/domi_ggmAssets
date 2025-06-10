import { favoriteTagContext, useFavoriteTagList } from "@components/Favorite/Tag/Context";
import AssetsListSideTagItemEdit from "./ItemEdit";
import { useContext, useEffect, useRef, useState } from "react";
import { FavoriteTagDict, FavoriteTagVO } from "@domiTypes/favoriteTag";
import { generateRandomString } from "@utils/misc";
import { request } from "@utils/request";

type TagStateDict = { [key: string]: 'edit' | 'remove' | 'add' };

export default function AssetsListSideTagListEdit() {
    const [ originTags ] = useFavoriteTagList(); // 진짜 적용되어있는거
    const [ localTags, setLocalTags ] = useState<FavoriteTagVO[] | null>(null); // 이건 수정 사항
    const { addCallRef, saveCallRef } = useContext(favoriteTagContext);
    const tagStateRef = useRef<TagStateDict>({});
    
    if (!addCallRef || !saveCallRef)
        throw new Error("아니 여기도 왜 Tag Providor이 없지???");

    // 태그 추가 콜백
    addCallRef.current = function() {
        if (!localTags) return;

        const id = `${generateRandomString(10)}-new`;
        const newItem = { id, color: "FF0000", name: "추강" };
        setLocalTags([ ...localTags, newItem ]);

        tagStateRef.current[id] = 'add';
    }

    saveCallRef.current = async function() {
        if (!localTags) return;

        // 인덱싱
        const indexedTags: FavoriteTagDict = {};
        localTags.forEach(v => {
            indexedTags[v.id] = v;
        });

        const form = Object.keys(tagStateRef.current)
            .map(id => {
                const state = tagStateRef.current[id];
                const item = indexedTags[id];

                let name: string | undefined;
                let color: string | undefined;

                if (state !== "remove") {
                    name = item.name;
                    color = item.color;
                }

                return {
                    action: state,
                    id: (state !== "add") ? id : undefined,
                    name,
                    color
                }
            });

        if (form.length === 0) return; // 애초에 저장할게 없자나..

        const result = await request<unknown>("asset/tag", { method: "POST", data: form });
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

        // 새거인데 지운거면 삭제 요청할 필요가 없지롱
        if (tagStateRef.current[id] === "add")
            delete tagStateRef.current[id];
        else
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
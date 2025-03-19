import style from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';
import lineIcon from '@assets/icons/horizontal-line.svg';

import leftArrowSvg from '@assets/icons/arrow-left.svg';
import { CategoryIndexing } from '@domiTypes/category';
import { useMemo, useState } from 'react';
import { useAssetSearchOption, useSetAssetSearchOption } from '../hook';

type Props = {
    list: CategoryIndexing,
    my: number,
    depth: number
}

export default function AssetsListSideCategoryBox({ my, depth, list }: Props) {
    const [ expand, setExpand ] = useState(false);
    const myChildren = list.children[my];
    const myCategory = list.dict[my];
    const ID = `domi-category-check-${my}`;
    const { category } = useAssetSearchOption();
    const setAssetSearchOption = useSetAssetSearchOption();

    const getCategorySetData = function() {
        return new Set(category.split(",")
            .filter(v => v.length > 0)
            .map(v => Number(v))
            .filter(v => !isNaN(v))
        );
    }

    // 자식 id 다 가져오지롱
    const getAllChildrenIds = function(target: number) {
        const result: number[] = [];
        
        const ids = list.children[target];
        if (ids) {
            result.push(...ids);

            for (const id of ids.values())
                result.push(...getAllChildrenIds(id));
        }

        return result;
    }

    // 이번엔 부모 id 순차적으로 가져옹
    const getParentIds = function(target: number) {
        const result = [];
        
        let nowId = target;
        while (list.dict[nowId].parentId) {
            const parentId = list.dict[nowId].parentId;
            if (!parentId) break;

            result.push(parentId);
            nowId = parentId;
        }

        return result;
    }

    // 해당 카테고리가 포함되어 있나???
    const isIncludeParent = function(value: number, target: number) {
        const data = list.dict[target];

        if (target === value)
            return true;
        
        if (data.parentId) {
            return isIncludeParent(value, data.parentId);
        }

        return false;
    }

    const checked = useMemo<boolean | null>(() => { // null은 부분 선택
        const nowCategorys = getCategorySetData();
        
        // 체크 된게 없엉
        if (nowCategorys.size === 0)
            return false;

        if (nowCategorys.has(my))
            return true;

        for (const element of nowCategorys.values()) {
            if (isIncludeParent(my, element)) {
                return null;
            }
        }

        return false;
    }, [ category ]);
    
    const handleExpand = function() {
        setExpand(!expand);
    }

    const handleChangeCheck = function(e: React.ChangeEvent<HTMLInputElement>) {
        const active = e.target.checked;
        const nowCategorys = getCategorySetData();

        if (active) {
            nowCategorys.add(my);
            
            // 부모에서 선택되어있으면 안됨
            getParentIds(my).forEach(v => nowCategorys.delete(v));
        } else {
            if (nowCategorys.has(my)) {
                nowCategorys.delete(my);
            } else { // 안에 자식도 꺼야함
                getAllChildrenIds(my).forEach(v => nowCategorys.delete(v));
            }
        }

        setAssetSearchOption({ category: Array.from(nowCategorys).join(",") });
    }

    return <>
        <div className={style.category} style={{ paddingLeft: (15 * depth) }}>
            <input type="checkbox" id={ID} className={style.check} checked={checked !== false} onChange={handleChangeCheck} />
            <label htmlFor={ID} className={style.check_design}>
                <img src={checked === null ? lineIcon : checkIcon} draggable={false} alt='check' />
            </label>
            <label htmlFor={ID} className={style.text}>{myCategory.name}</label>

            {/* <p>3D</p> */}
            {myChildren && <button className={`${style.toggle} ${expand ? style.active : ''}`} onClick={handleExpand}>
                <img src={leftArrowSvg} alt="toggle" />
            </button>}
        </div>

        {/* 하위 카테고리까지 선택 ㅁㄴㅇㄹ */}
        {(expand && myChildren) && Array.from(myChildren).map(v => <AssetsListSideCategoryBox key={v} my={v} depth={depth + 1} list={list} />)}
    </>;
}
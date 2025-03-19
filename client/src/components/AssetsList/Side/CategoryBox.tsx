import style from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';

import leftArrowSvg from '@assets/icons/arrow-left.svg';
import { CategoryIndexing } from '@domiTypes/category';
import { useState } from 'react';

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

    const handleExpand = function() {
        setExpand(!expand);
    }

    return <>
        <div className={style.category} style={{ paddingLeft: (15 * depth) }}>
            <input type="checkbox" id={ID} className={style.check} />
            <label htmlFor={ID} className={style.check_design}>
                <img src={checkIcon} draggable={false} alt='check' />
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
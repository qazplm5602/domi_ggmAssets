import style from '@styles/admin/category.module.scss';
import AdminCategoryItem from './Item';
import { CategoryOptionDTO, NodeIndexing } from '@domiTypes/category';
import { useMemo } from 'react';
import AdminEditCategorySelectItemGridList from '../Edit/CategorySelect/GridList';

type Props = {
    id: number,
    table: NodeIndexing<CategoryOptionDTO>,
    depth?: number,
    last?: boolean,
    lalast?: boolean
}

export default function AdminCategoryBox({ id, table, depth = 0, last = false, lalast = false }: Props) {
    const childCategorys = useMemo(() => Array.from(table.children[id] || []), [ table ]);

    return <>
        <div className={style.box}>
            {/* 선 그릴꺼잉 */}
            <AdminEditCategorySelectItemGridList depth={depth} last={last} lalast={lalast} />

            <AdminCategoryItem category={table.dict[id]} />
        </div>
        {childCategorys.map((targetId, idx) => <AdminCategoryBox depth={depth + 1} last={idx === childCategorys.length - 1} lalast={last} key={targetId} id={targetId} table={table} />)}
    </>;
}

// // 이 이후에는 테스트임...

// export function AdminCategoryBox2() {
//     return <div className={style.box}>
//         <AdminEditCategorySelectItemGrid mode='center' />
//         <AdminCategoryItem />
//     </div>;
// }

// export function AdminCategoryBox3() {
//     return <div className={style.box}>
//         <AdminEditCategorySelectItemGrid mode='end' />
//         <AdminCategoryItem />
//     </div>;
// }

// export function AdminCategoryBox4() {
//     return <div className={style.box}>
//         <AdminEditCategorySelectItemGrid mode='line' />
//         <AdminEditCategorySelectItemGrid mode='end' />
//         <AdminCategoryItem />
//     </div>;
// }
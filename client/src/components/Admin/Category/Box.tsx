import style from '@styles/admin/category.module.scss';
import AdminEditCategorySelectItemGrid from '../Edit/CategorySelect/Grid';
import AdminCategoryItem from './Item';
import { CategoryCountVO, NodeIndexing } from '@domiTypes/category';
import { useMemo } from 'react';

type Props = {
    id: number,
    table: NodeIndexing<CategoryCountVO>,
    depth?: number,
    last?: boolean,
    lalast?: boolean
}

export default function AdminCategoryBox({ id, table, depth = 0, last = false, lalast = false }: Props) {
    const childCategorys = useMemo(() => Array.from(table.children[id] || []), [ table ]);

    return <>
        <div className={style.box}>
            {/* 선 그릴꺼잉 */}
            {Array.from(new Array(depth)).map((_, i) => {
                let mode: Parameters<typeof AdminEditCategorySelectItemGrid>['0']['mode'] = 'line';

                // 끝쪽임
                if (i === depth - 1) {
                    mode = last ? 'end' : 'center';
                } else if (lalast) { // 끝쪽은 아닌데 아무튼 카테고리 내에서 맨 마지막에 있엉
                    mode = 'space';
                }

                return <AdminEditCategorySelectItemGrid key={i} mode={mode} />;
            })}

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
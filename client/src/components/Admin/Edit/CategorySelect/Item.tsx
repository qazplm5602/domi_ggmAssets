import style from '@styles/admin/edit.module.scss';
import { CategoryVO, NodeIndexing } from '@domiTypes/category';
import { useContext, useMemo } from 'react';
import AdminEditCategorySelectItemGridList from './GridList';
import { AdminEditCategorySelectContext } from './SearchState';

type Props = {
    table: NodeIndexing<CategoryVO>,
    id: number,
    depth?: number,
    last?: boolean,
    lalast?: boolean
}

export default function AdminEditCategorySelectItem({ id, table, depth = 0, last = false, lalast = false }: Props) {
    const myCategory = table.dict[id];
    const childCategorys = useMemo(() => Array.from(table.children[id] || []), [ table ]);
    const { onSelect } = useContext(AdminEditCategorySelectContext);
    
    const handleClick = function() {
        onSelect(id);
    }

    return <>
        <div className={style.item}>
            <AdminEditCategorySelectItemGridList depth={depth} last={last} lalast={lalast} />
            <button onClick={handleClick}>{myCategory.name}</button>
        </div>

        {childCategorys.map((id, index) => <AdminEditCategorySelectItem key={id} id={id} table={table} depth={depth + 1} last={childCategorys.length === index + 1} lalast={last} />)}
    </>;
}
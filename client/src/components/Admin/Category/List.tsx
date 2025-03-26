import style from '@styles/admin/category.module.scss';
import AdminCategoryBox from './Box';
import { CategoryCountVO } from '@domiTypes/category';
import { useMemo } from 'react';
import { categoryDataIndex } from '@utils/category';

type Props = {
    list: CategoryCountVO[]
}

export default function AdminCategoryList({ list }: Props) {
    const categoryData = useMemo(() => categoryDataIndex(list), [ list ]);
    
    return <section className={style.list}>
        {Array.from(categoryData.children[-1]).map(i => <AdminCategoryBox key={i} id={i} table={categoryData} />)}
    </section>;
}
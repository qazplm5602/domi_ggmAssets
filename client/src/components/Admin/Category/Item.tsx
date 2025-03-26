import style from '@styles/admin/category.module.scss';
import AdminCategoryItemContent from './ItemContent';
import { CategoryCountVO } from '@domiTypes/category';
// import AdminCategoryItemEditContent from './ItemEdit';

type Props = {
    // edit?: boolean
    category: CategoryCountVO
}

export default function AdminCategoryItem({ category }: Props) {
    return <div className={style.item}>
        <AdminCategoryItemContent name={category.name} count={category.count} />
        {/* <AdminCategoryItemEditContent /> */}
    </div>;
}
import style from '@styles/admin/category.module.scss';
import AdminCategoryItemContent from './ItemContent';
// import AdminCategoryItemEditContent from './ItemEdit';

type Props = {
    // edit?: boolean
}

export default function AdminCategoryItem({ }: Props) {
    return <div className={style.item}>
        <AdminCategoryItemContent />
        {/* <AdminCategoryItemEditContent /> */}
    </div>;
}
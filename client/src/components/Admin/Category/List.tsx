import style from '@styles/admin/category.module.scss';
import AdminCategoryItem from './Item';

export default function AdminCategoryList() {
    return <section className={style.list}>
        <AdminCategoryItem />
    </section>;
}
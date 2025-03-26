import style from '@styles/admin/category.module.scss';
import AdminCategoryBox, { AdminCategoryBox2, AdminCategoryBox3, AdminCategoryBox4 } from './Box';

export default function AdminCategoryList() {
    return <section className={style.list}>
        <AdminCategoryBox />
        <AdminCategoryBox2 />
        <AdminCategoryBox2 />
        <AdminCategoryBox4 />
        <AdminCategoryBox3 />
    </section>;
}
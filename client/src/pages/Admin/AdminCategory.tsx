import baseStyle from '@styles/admin/edit.module.scss';
import style from '@styles/admin/category.module.scss';
import Button from '@components/Buttons/Button';
import AdminCategoryList from '@components/Admin/Category/List';

export default function AdminCategory() {
    return <main className={style.screen}>
        <section className={baseStyle.head}>
            <h1>카테고리 관리</h1>
            <Button>추가</Button>
        </section>

        <AdminCategoryList />
    </main>;
}
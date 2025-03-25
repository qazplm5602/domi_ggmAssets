import style from '@styles/admin/edit.module.scss';
import AdminEditCategorySelectItem from './Item';

export default function AdminEditCategorySelectContent() {
    return <section className={style.list}>
        <AdminEditCategorySelectItem />
    </section>;
}
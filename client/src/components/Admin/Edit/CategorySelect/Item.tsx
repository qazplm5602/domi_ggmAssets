import style from '@styles/admin/edit.module.scss';
import AdminEditCategorySelectItemGrid from './Grid';

export default function AdminEditCategorySelectItem() {
    return <div className={style.item}>
        <AdminEditCategorySelectItemGrid mode='line' />
        <AdminEditCategorySelectItemGrid mode='end' />
        <AdminEditCategorySelectItemGrid mode='center' />
        <button>모델링</button>
    </div>;
}
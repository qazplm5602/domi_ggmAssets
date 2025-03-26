import style from '@styles/admin/category.module.scss';
import AdminEditCategorySelectItemGrid from '../Edit/CategorySelect/Grid';
import AdminCategoryItem from './Item';

export default function AdminCategoryBox() {
    return <div className={style.box}>
        <AdminCategoryItem />
    </div>;
}

// 이 이후에는 테스트임...

export function AdminCategoryBox2() {
    return <div className={style.box}>
        <AdminEditCategorySelectItemGrid mode='center' />
        <AdminCategoryItem />
    </div>;
}

export function AdminCategoryBox3() {
    return <div className={style.box}>
        <AdminEditCategorySelectItemGrid mode='end' />
        <AdminCategoryItem />
    </div>;
}

export function AdminCategoryBox4() {
    return <div className={style.box}>
        <AdminEditCategorySelectItemGrid mode='line' />
        <AdminEditCategorySelectItemGrid mode='end' />
        <AdminCategoryItem />
    </div>;
}
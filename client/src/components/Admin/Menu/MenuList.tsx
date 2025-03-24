import style from '@styles/admin/menu.module.scss';
import AdminMenuItem from './Item';

export default function AdminMenuList() {
    return <section className={style.list}>
        <AdminMenuItem />
        <AdminMenuItem />
    </section>;
}
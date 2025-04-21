import AdminMenuList from '@components/Admin/Menu/MenuList';
import MetaTag from '@components/MetaTag/MetaTag';
import style from '@styles/admin/style.module.scss';

export default function AdminMenu() {
    return <main className={style.screen}>
        <MetaTag title='관리 메뉴' />

        <h1 className={style.head_title}>관리 메뉴</h1>
        <AdminMenuList />
    </main>;
}
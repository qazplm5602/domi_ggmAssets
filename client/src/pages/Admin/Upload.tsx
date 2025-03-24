import AdminFileLinkField from '@components/Admin/Field/FileLinkField';
import AdminHead from '@components/Admin/Head';
import AdminStoreLinkField from '@components/Admin/Field/StoreLinkField';
import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/upload.module.scss';
import VersionField from '@components/Admin/Field/VersionField';

export default function AdminUpload() {
    return <main className={`${baseStyle.small_screen} ${style.main}`}>
        <AdminHead className={style.head} />
        
        <AdminFileLinkField />
        <AdminStoreLinkField />
        <VersionField />
    </main>;
}
import AdminEditContent from '@components/Admin/Edit/Content';
import AdminEditSide from '@components/Admin/Edit/Side';
import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/edit.module.scss';

export default function AdminAssetEdit() {
    return <main className={`${baseStyle.screen} ${style.screen}`}>
        <AdminEditContent />
        <AdminEditSide />
    </main>
}
import style from '@styles/admin/edit.module.scss';
import AdminEditPreviewAsset from './PreviewAsset';
import Button from '@components/Buttons/Button';

export default function AdminEditSide() {
    return <aside className={style.side}>
        <AdminEditPreviewAsset />
        <Button className={style.autoBtn}>자동 채우기</Button>
    </aside>;
}
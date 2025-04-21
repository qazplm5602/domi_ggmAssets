import style from '@styles/admin/edit.module.scss';
import AdminEditPreviewAsset from './PreviewAsset';
import Button from '@components/Buttons/Button';
import { AssetEditFieldStates } from '@domiTypes/assetEdit';
import AdminEditSideDangerZone from './DangerZone';

type Props = {
    fields: AssetEditFieldStates,
    onOpenAutoField?: () => void
}

export default function AdminEditSide({ fields, onOpenAutoField }: Props) {
    return <aside className={style.side}>
        <AdminEditPreviewAsset fields={fields} />
        <Button className={style.autoBtn} onClick={onOpenAutoField}>자동 채우기</Button>
        <AdminEditSideDangerZone />
    </aside>;
}
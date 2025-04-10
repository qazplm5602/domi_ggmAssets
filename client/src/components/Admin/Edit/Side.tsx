import style from '@styles/admin/edit.module.scss';
import AdminEditPreviewAsset from './PreviewAsset';
import Button from '@components/Buttons/Button';
import { AssetEditFieldStates } from '@domiTypes/assetEdit';

type Props = {
    fields: AssetEditFieldStates
}

export default function AdminEditSide({ fields }: Props) {
    return <aside className={style.side}>
        <AdminEditPreviewAsset fields={fields} />
        <Button className={style.autoBtn}>자동 채우기</Button>
    </aside>;
}
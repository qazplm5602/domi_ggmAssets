import AssetItem from '@components/AssetsList/Item/Item';
import style from '@styles/admin/edit.module.scss';

export default function AdminEditPreviewAsset() {
    return <div className={style.previewAsset}>
        <AssetItem />
    </div>;
}
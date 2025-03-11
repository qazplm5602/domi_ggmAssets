import style from '@styles/assetsList/style.module.scss';
import AssetsListItemThumbnail from './Thumbnail';

export default function AssetItem() {
    return <div className={style.item}>
        <AssetsListItemThumbnail />
    </div>;
}
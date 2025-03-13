import style from '@styles/assetsList/style.module.scss';
import AssetsListItemThumbnail from './Thumbnail';
import { Link } from 'react-router-dom';
import AssetItemDetail from './Detail';
import AssetItemInfo from './Info';

export default function AssetItem() {
    return <Link to='/asset/1'>
        <div className={style.item}>
            <AssetsListItemThumbnail />
            <AssetItemDetail />
            <AssetItemInfo />
        </div>
    </Link>;
}
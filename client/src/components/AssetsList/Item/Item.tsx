import style from '@styles/assetsList/style.module.scss';
import AssetsListItemThumbnail from './Thumbnail';
import { Link } from 'react-router-dom';
import AssetItemDetail from './Detail';
import AssetItemInfo from './Info';

type Props = {
    className?: string
}

export default function AssetItem({ className }: Props) {
    return <Link to='/asset/1'>
        <div className={`${style.item} ${className || ''}`}>
            <AssetsListItemThumbnail />
            <AssetItemDetail />
            <AssetItemInfo />
        </div>
    </Link>;
}
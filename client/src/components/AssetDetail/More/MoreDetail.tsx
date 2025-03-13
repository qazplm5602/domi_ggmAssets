import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSimpleDesc from './SimpleDesc';
import AssetDetailMoreCompatibility from './Compatibility/MoreCompatibility';
import AssetDetailMoreFullDesc from './FullDesc';

export default function AssetDetailMore() {
    return <article className={style.more}>
        <AssetDetailMoreSimpleDesc />
        <AssetDetailMoreCompatibility />
        <AssetDetailMoreFullDesc />
    </article>;
}
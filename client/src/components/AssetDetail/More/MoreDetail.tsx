import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSimpleDesc from './SimpleDesc';
import AssetDetailMoreCompatibility from './Compatibility/MoreCompatibility';

export default function AssetDetailMore() {
    return <article className={style.more}>
        <AssetDetailMoreSimpleDesc />
        <AssetDetailMoreCompatibility />
    </article>;
}
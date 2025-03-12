import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSimpleDesc from './SimpleDesc';

export default function AssetDetailMore() {
    return <article className={style.more}>
        <AssetDetailMoreSimpleDesc />
    </article>;
}
import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSection from './MoreSection';

export default function AssetDetailMore() {
    return <article className={style.more}>
        <AssetDetailMoreSection title="간단한 설명" />
    </article>;
}
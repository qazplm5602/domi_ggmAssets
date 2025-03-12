import style from '@styles/assetDetail/style.module.scss';
import AssetDetailGallery from './Gallery';
import AssetDetailInfo from './Info';

export default function AssetDetailPreviewContainer() {
    return <article className={style.preview_main}>
        <AssetDetailGallery />
        <AssetDetailInfo />
    </article>;
}
import style from '@styles/assetDetail/style.module.scss';
import AssetDetailGallery from './Gallery';
import AssetDetailInfo from './Info';
import { AssetDetailVO } from '@domiTypes/asset';

type Props = {
    data: AssetDetailVO
}

export default function AssetDetailPreviewContainer({ data }: Props) {
    return <article className={style.preview_main}>
        <AssetDetailGallery images={data.images} />
        <AssetDetailInfo data={data} />
    </article>;
}
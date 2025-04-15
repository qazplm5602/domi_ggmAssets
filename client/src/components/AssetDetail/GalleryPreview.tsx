import style from '@styles/assetDetail/style.module.scss';
import AssetDetailGalleryArrow from './GalleryArrow';
import { ThumbnailVO } from '@domiTypes/asset';
import { getThumbnailURL } from '@utils/file';

import emptyBg from '@assets/empty-bg.webp';

type Props = {
    thumbnail: ThumbnailVO | undefined,
    onNext?: () => void,
    onPrev?: () => void,
}

export default function AssetDetailGalleryPreview({ thumbnail, onPrev, onNext }: Props) {
    return <div className={style.viewer}>
        {thumbnail?.type !== "Youtube" ? <img src={thumbnail ? getThumbnailURL(thumbnail.contentUrl) : emptyBg} alt="thumbnail 1" /> : <iframe src={thumbnail.contentUrl} allow='fullscreen' />}
        
        <AssetDetailGalleryArrow onClick={onPrev} />
        <AssetDetailGalleryArrow right={true} onClick={onNext} />
    </div>;
}
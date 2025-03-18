import style from '@styles/assetDetail/style.module.scss';
import AssetDetailGalleryArrow from './GalleryArrow';

type Props = {
    url: string,
    onNext?: () => void,
    onPrev?: () => void,
}

export default function AssetDetailGalleryPreview({ url, onPrev, onNext }: Props) {
    return <div className={style.viewer}>
        <img src={url} alt="thumbnail 1" />
        
        <AssetDetailGalleryArrow onClick={onPrev} />
        <AssetDetailGalleryArrow right={true} onClick={onNext} />
    </div>;
}
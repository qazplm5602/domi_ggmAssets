import { ThumbnailVO } from '@domiTypes/asset';
import style from '@styles/assetDetail/style.module.scss';
import { getThumbnailURL } from '@utils/file';

type Props = {
    images: ThumbnailVO[],
    current: number,
    onClick?: (idx: number) => void
}

export default function AssetDetailGalleryList({ images, current, onClick }: Props) {
    const handleImageClick = function(idx: number) {
        if (onClick)
            onClick(idx);
    }

    return <section className={style.list}>
        {images.map((v, i) => <button key={v.previewUrl} className={`${style.box} ${current === i ? style.disable : ''}`} onClick={() => handleImageClick(i)}>
            <img src={getThumbnailURL(v.previewUrl)} alt={`thumbnail ${i}`} />
        </button>)}
    </section>;
}
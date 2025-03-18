import style from '@styles/assetDetail/style.module.scss';
import AssetDetailGalleryPreview from './GalleryPreview';
import AssetDetailGalleryList from './GalleryList';
import { ThumbnailVO } from '@domiTypes/asset';
import { useEffect, useState } from 'react';
import { getThumbnailURL } from '@utils/file';

type Props = {
    images: ThumbnailVO[]
}

export default function AssetDetailGallery({ images }: Props) {
    const [ currentIdx, setCurrentIdx ] = useState(0);
    const thumbnail = images[currentIdx];

    const handleChangeImage = function(idx: number) {
        setCurrentIdx(idx);
    }
    
    const handleNext = function() {
        if ((currentIdx + 1) >= images.length) {
            return setCurrentIdx(0);
        }

        setCurrentIdx(currentIdx + 1);
    }
    
    const handlePrev = function() {
        if (currentIdx - 1 < 0)
            return setCurrentIdx(images.length - 1);

        setCurrentIdx(currentIdx - 1);
    }

    useEffect(() => {
        setCurrentIdx(0);
    }, [ images ]);

    return <div className={style.gallery}>
        <AssetDetailGalleryPreview url={getThumbnailURL(thumbnail.contentUrl)} onPrev={handlePrev} onNext={handleNext} />
        <AssetDetailGalleryList images={images} current={currentIdx} onClick={handleChangeImage} />
    </div>;
}
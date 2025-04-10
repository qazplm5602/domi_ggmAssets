import style from '@styles/admin/edit.module.scss';

import leftArrow from '@assets/icons/ic-round-arrow-right.svg';
import deleteIcon from '@assets/icons/ic-baseline-delete.svg';
import { ThumbnailLocalVO } from '@domiTypes/assetEdit';
import { getThumbnailURL } from '@utils/file';
import { useEffect, useState } from 'react';
import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';

type Props = {
    data: ThumbnailLocalVO,
    onMove?: (left: boolean) => void,
    onRemove?: () => void
}

export default function AdminEditGalleryItem({ data, onMove, onRemove }: Props) {
    const [ imageURL, setImageURL ] = useState<string | null>(null);

    useEffect(() => {
        setImageURL(null);
        let alive = true;

        if (data.local) {
            let fileEntity = data.contentFile;
        
            if (data.type === "Youtube")
                fileEntity=  data.previewFile;

            if (!fileEntity) return;

            // 파일 직접 열어서 보깅
            const reader = new FileReader();
            reader.onload = function() {
                if (!alive || reader.error) return;

                if (typeof reader.result === "string")
                    setImageURL(reader.result);
            }
            
            reader.readAsDataURL(fileEntity);

        } else {
            setImageURL(getThumbnailURL(data.type === 'Youtube' ? data.previewUrl : data.contentUrl));
        }

        return () => {
            alive = false;
        }
    }, [ data ]);

    const handleMove = function(left: boolean) {
        if (onMove)
            onMove(left);
    }
    
    return <div className={`${style.box} ${style.loading}`}>
        {imageURL ? <img src={imageURL} alt="preview image" className={style.preview} /> : <SkeletonLoadBox className={style.preview} />}

        {/* 관리 그거 */}
        <div className={style.option}>
            <button onClick={() => handleMove(true)}>
                <img src={leftArrow} alt="left arrow" />
            </button>
            <button onClick={onRemove}>
                <img src={deleteIcon} alt="remove arrow" />
            </button>
            <button onClick={() => handleMove(false)}>
                <img src={leftArrow} alt="right arrow" className={style.flip} />
            </button>
        </div>
    </div>;
}
import style from '@styles/admin/edit.module.scss';

import leftArrow from '@assets/icons/ic-round-arrow-right.svg';
import deleteIcon from '@assets/icons/ic-baseline-delete.svg';
import { ThumbnailLocalVO } from '@domiTypes/assetEdit';
import { getThumbnailURL } from '@utils/file';

type Props = {
    data: ThumbnailLocalVO,
    onMove?: (left: boolean) => void,
    onRemove?: () => void
}

export default function AdminEditGalleryItem({ data, onMove, onRemove }: Props) {
    const handleMove = function(left: boolean) {
        if (onMove)
            onMove(left);
    }
    
    return <div className={style.box}>
        <img src={getThumbnailURL(data.type === 'Youtube' ? data.previewUrl : data.contentUrl)} alt="preview image" className={style.preview} />

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
import style from '@styles/admin/edit.module.scss';

import leftArrow from '@assets/icons/ic-round-arrow-right.svg';
import deleteIcon from '@assets/icons/ic-baseline-delete.svg';
import { ThumbnailLocalVO } from '@domiTypes/assetEdit';
import { getThumbnailURL } from '@utils/file';

type Props = {
    data: ThumbnailLocalVO
}

export default function AdminEditGalleryItem({ data }: Props) {
    return <div className={style.box}>
        <img src={getThumbnailURL(data.type === 'Youtube' ? data.previewUrl : data.contentUrl)} alt="preview image" className={style.preview} />

        {/* 관리 그거 */}
        <div className={style.option}>
            <button>
                <img src={leftArrow} alt="left arrow" />
            </button>
            <button>
                <img src={deleteIcon} alt="remove arrow" />
            </button>
            <button>
                <img src={leftArrow} alt="right arrow" className={style.flip} />
            </button>
        </div>
    </div>;
}
import style from '@styles/admin/edit.module.scss';

import leftArrow from '@assets/icons/ic-round-arrow-right.svg';
import deleteIcon from '@assets/icons/ic-baseline-delete.svg';

export default function AdminEditGalleryItem() {
    return <div className={style.box}>
        <img src="/files/thumbnail/domi_preview.jpg" alt="preview image" className={style.preview} />

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
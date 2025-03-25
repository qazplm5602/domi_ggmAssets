import style from '@styles/admin/edit.module.scss';

import rightArrow from '@assets/icons/ic-round-arrow-right.svg';

export default function AdminEditGalleryItem() {
    return <div className={style.box}>
        <img src="/files/thumbnail/domi_preview.jpg" alt="preview image" className={style.preview} />

        {/* 관리 그거 */}
        <div className={style.option}>
            <button>
                <img src={rightArrow} alt="rgiht arrow" />
            </button>
        </div>
    </div>;
}
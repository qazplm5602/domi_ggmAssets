import style from '@styles/admin/edit.module.scss';

import pictureIcon from '@assets/icons/remix-fill-media-image.svg';
import youtubeIcon from '@assets/icons/youtube.svg';

export default function AdminEditThumbnailUploadDialogSelect() {
    return <section className={`${style.content} ${style.select}`}>
        <button>
            <img src={pictureIcon} alt="picture" />
            <h3>이미지</h3>
        </button>

        <button>
            <img src={youtubeIcon} alt="picture" />
            <h3>유튜브</h3>
        </button>
    </section>;
}
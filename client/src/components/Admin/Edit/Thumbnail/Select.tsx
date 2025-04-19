import style from '@styles/admin/edit.module.scss';

import pictureIcon from '@assets/icons/remix-fill-media-image.svg';
import youtubeIcon from '@assets/icons/youtube.svg';

type Props = {
    onSelectImage?: () => void,
    onSelectYoutube?: () => void
}

export default function AdminEditThumbnailUploadDialogSelect({ onSelectImage, onSelectYoutube }: Props) {
    return <section className={`${style.content} ${style.select}`}>
        <button onClick={onSelectImage}>
            <img src={pictureIcon} alt="picture" />
            <h3>이미지</h3>
        </button>

        <button onClick={onSelectYoutube}>
            <img src={youtubeIcon} alt="youtube" />
            <h3>유튜브</h3>
        </button>
    </section>;
}
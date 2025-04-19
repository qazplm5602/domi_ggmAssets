import style from '@styles/admin/edit.module.scss';
import addIcon from '@assets/icons/ic-round-add.svg';

type Props = {
    onClick?: () => void
}

export default function AdminEditGalleryAddBox({ onClick }: Props) {
    return <button className={`${style.box} ${style.add}`} onClick={onClick}>
        <img src={addIcon} alt="image add" />
    </button>;
}
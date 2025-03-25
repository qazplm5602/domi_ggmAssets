import style from '@styles/admin/edit.module.scss';
import addIcon from '@assets/icons/ic-round-add.svg';

export default function AdminEditGalleryAddBox() {
    return <button className={`${style.box} ${style.add}`}>
        <img src={addIcon} alt="image add" />
    </button>;
}
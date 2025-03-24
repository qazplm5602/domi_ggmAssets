import style from '@styles/admin/style.module.scss';
import uploadIcon from '@assets/icons/upload.svg';

export default function AdminHead() {
    return <section className={style.head}>
        <img src={uploadIcon} alt="title icon" />
        <h1>에셋 업로드</h1>
    </section>
}
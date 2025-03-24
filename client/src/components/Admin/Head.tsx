import style from '@styles/admin/style.module.scss';
import uploadIcon from '@assets/icons/upload.svg';

type Props = {
    className?: string
}

export default function AdminHead({ className }: Props) {
    return <section className={`${style.head} ${className || ''}`}>
        <img src={uploadIcon} alt="title icon" />
        <h1>에셋 업로드</h1>
    </section>
}
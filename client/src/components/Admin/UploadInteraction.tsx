import Button from '@components/Buttons/Button';
import style from '@styles/admin/upload.module.scss';

export default function AdminUploadInteraction() {
    return <article className={style.interaction}>
        <div className={style.alert}>에셋 정보 부족으로 수동 입력 페이지로 이동 됩니다.</div>
        <Button className={style.send}>업로드</Button>
    </article>
}
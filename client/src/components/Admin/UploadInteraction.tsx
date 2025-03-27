import Button from '@components/Buttons/Button';
import style from '@styles/admin/upload.module.scss';

type Props = {
    warning?: boolean
}

export default function AdminUploadInteraction({ warning }: Props) {
    return <article className={style.interaction}>
        {warning && <div className={style.alert}>스토어가 감지되지 않아 수동 입력 페이지로 이동 됩니다.</div>}
        <Button className={style.send}>업로드</Button>
    </article>
}
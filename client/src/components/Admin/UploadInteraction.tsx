import Button from '@components/Buttons/Button';
import Spinner from '@components/Spinner/Spinner';
import style from '@styles/admin/upload.module.scss';

type Props = {
    warning?: boolean,
    loading?: boolean,
    onUpload?: () => void
}

export default function AdminUploadInteraction({ warning, loading, onUpload }: Props) {
    return <article className={style.interaction}>
        {warning && <div className={style.alert}>스토어가 감지되지 않아 수동 입력 페이지로 이동 됩니다.</div>}
        <Button className={style.send} disabled={loading} onClick={onUpload}>
            업로드

            {loading && <div className={style.loading}>
                <Spinner className={style.spinner} />
                <span>업로드 중....</span>
            </div>}
        </Button>
    </article>
}
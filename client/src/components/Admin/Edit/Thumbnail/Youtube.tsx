import AdminField from '@components/Admin/Field/Field';
import Input from '@components/Admin/Inputs/Input';
import Button from '@components/Buttons/Button';
import style from '@styles/admin/edit.module.scss';

type Props = {
    onBack?: () => void
}

export default function AdminEditThumbnailUploadDialogYoutube({ onBack }: Props) {
    return <section className={`${style.content} ${style.youtube}`}>
        <AdminField title="유튜브 URL" className={style.field}>
            <Input placeholder='유튜브 영상 링크를 입력하세요.' />
            <div className={style.alert}>유튜브 영상 링크나 ID가 아닙니다.</div>
        </AdminField>

        <article className={style.interaction}>
            <Button onClick={onBack}>뒤로가기</Button>
            <Button className={style.upload} onClick={onBack}>업로드</Button>
        </article>
    </section>;
}
import style from '@styles/admin/edit.module.scss';
import Button from '@components/Buttons/Button';

type Props = {
    updated: boolean,
    onSave?: () => void
}

export default function AdminEditHead({ updated, onSave }: Props) {
    return <article className={style.head}>
        <h1>에셋 수정</h1>

        <section className={style.interaction}>
            {updated && <p>저장되지 않은 변경사항이 있습니다.</p>}
            <Button className={style.save} onClick={onSave} disabled={!updated}>저장</Button>
        </section>
    </article>;
}
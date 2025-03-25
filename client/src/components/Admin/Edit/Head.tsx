import style from '@styles/admin/edit.module.scss';
import Button from '@components/Buttons/Button';

export default function AdminEditHead() {
    return <article className={style.head}>
        <h1>에셋 수정</h1>

        <section className={style.interaction}>
            <p>저장되지 않은 변경사항이 있습니다.</p>
            <Button className={style.save}>저장</Button>
        </section>
    </article>;
}
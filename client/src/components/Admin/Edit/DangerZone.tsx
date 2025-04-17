import Button from '@components/Buttons/Button';
import style from '@styles/admin/edit.module.scss';

export default function AdminEditSideDangerZone() {
    return <section className={style.danger}>
        <h3>Danger Zone</h3>
        <Button>삭제</Button>
    </section>;
}
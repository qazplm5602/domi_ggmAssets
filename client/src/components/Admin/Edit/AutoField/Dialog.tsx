import style from '@styles/admin/edit.module.scss';

// import AdminStoreLinkField from "@components/Admin/Field/StoreLinkField";
import Dialog from "@components/Dialog/Dialog";
import Button from '@components/Buttons/Button';

export default function AdminEditCategoryAutoFieldDialog() {
    return <Dialog show={false} title="자동 채우기" className={style.autoFieldDialog}>
        <section className={style.container}>
            {/* <AdminStoreLinkField className={style.field} /> */}
        </section>

        <section className={style.interaction}>
            <div className={style.alert}>지원되지 않는 스토어 입니다.</div>
            <Button className={style.startBtn}>시작</Button>
        </section>
    </Dialog>
}
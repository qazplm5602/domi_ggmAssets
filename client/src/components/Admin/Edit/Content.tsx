import AdminEditCategoryField from "../Field/CategoryField";
import AdminField from "../Field/Field";
import AdminFileLinkField from "../Field/FileLinkField";
import AdminEditImageField from "../Field/ImageField";
import AdminStoreLinkField from "../Field/StoreLinkField";
import VersionField from "../Field/VersionField";
import Input from "../Inputs/Input";
import AdminEditHead from "./Head";
import style from '@styles/admin/edit.module.scss';

export default function AdminEditContent() {
    return <section className={style.content}>
        <AdminEditHead />

        <AdminField title="제목" required={true} className={style.field}>
            <Input placeholder="제목을 입력하세요." />
        </AdminField>

        <AdminFileLinkField className={style.field} />
        <AdminStoreLinkField className={style.field} />
        <VersionField className={style.field} />
        <AdminEditCategoryField className={style.field} />
        
        <AdminField title="등록일" className={style.field}>
            <Input type="date" />
        </AdminField>

        <AdminEditImageField className={style.field} />
    </section>
}
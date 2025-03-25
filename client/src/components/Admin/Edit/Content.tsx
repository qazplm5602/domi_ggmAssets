import AdminEditCategoryField from "../Field/CategoryField";
import AdminEditCompatibilityField from "../Field/Compatibility/CompatibilityField";
import AdminField from "../Field/Field";
import AdminFileLinkField from "../Field/FileLinkField";
import AdminEditImageField from "../Field/ImageField";
import AdminEditPublisherField from "../Field/PublisherField";
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
        <AdminEditPublisherField className={style.field} />
        
        <AdminField title="등록일" className={style.field}>
            <Input type="date" />
        </AdminField>

        <AdminEditImageField className={style.field} />
        <AdminEditCompatibilityField className={style.field} />

        <AdminField title="간단한 설명" className={style.field}>
            <textarea className={style.skinTextarea} placeholder="간단한 설명을 입력하세요."></textarea>
        </AdminField>

        <AdminField title="설명" className={style.field}>
            <textarea className={`${style.skinTextarea} ${style.big}`} placeholder="설명을 입력하세요."></textarea>
        </AdminField>
    </section>
}
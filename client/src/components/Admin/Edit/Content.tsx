import { AssetEditFieldStates } from "@domiTypes/assetEdit";
import AdminEditCategoryField from "../Field/CategoryField";
import AdminEditCompatibilityField from "../Field/Compatibility/CompatibilityField";
import AdminField from "../Field/Field";
import AdminFileLinkField from "../Field/FileLinkField";
import AdminEditImageField from "../Field/ImageField";
import AdminEditPublisherField from "../Field/PublisherField";
import AdminStoreLinkField from "../Field/StoreLinkField";
import VersionField from "../Field/VersionField";
import Input from "../Inputs/Input";
import AdminEditCategoryAutoFieldDialog from "./AutoField/Dialog";
import AdminEditCategorySelectDialog from "./CategorySelect/CategorySelectDialog";
import AdminEditHead from "./Head";
import style from '@styles/admin/edit.module.scss';
import { useState } from "react";
import { AssetBaseVO } from "@domiTypes/asset";
import Textarea from "../Inputs/Textarea";

type Props = {
    fields: AssetEditFieldStates,
    updated: boolean
}

export default function AdminEditContent({ fields, updated }: Props) {
    const storelinkPlatformState = useState<AssetBaseVO['platform']>(null);

    return <section className={style.content}>
        <AdminEditHead updated={updated} />

        <AdminField title="제목" required={true} className={style.field}>
            <Input placeholder="제목을 입력하세요." autoValue={fields.title} />
        </AdminField>

        <AdminFileLinkField className={style.field} value={fields.fileLink} />
        <AdminStoreLinkField className={style.field} value={fields.storeLink} platform={storelinkPlatformState} />
        <VersionField className={style.field} value={fields.version} />
        <AdminEditCategoryField className={style.field} />
        <AdminEditPublisherField className={style.field} platform={fields.platform} artist={fields.artist} />
        
        <AdminField title="등록일" className={style.field}>
            <Input type="date" autoValue={fields.createAt} />
        </AdminField>

        <AdminEditImageField className={style.field} />
        <AdminEditCompatibilityField className={style.field} />

        <AdminField title="간단한 설명" className={style.field}>
            <Textarea className={style.skinTextarea} placeholder="간단한 설명을 입력하세요." autoValue={fields.shortDesc} />
        </AdminField>

        <AdminField title="설명" className={style.field}>
            <Textarea className={`${style.skinTextarea} ${style.big}`} placeholder="설명을 입력하세요." autoValue={fields.description} />
        </AdminField>

        <AdminEditCategorySelectDialog />
        <AdminEditCategoryAutoFieldDialog />
    </section>
}
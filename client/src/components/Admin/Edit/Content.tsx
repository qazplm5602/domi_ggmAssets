import { AssetEditFieldStates, ThumbnailLocalVO } from "@domiTypes/assetEdit";
import AdminEditCategoryField from "../Field/Category/CategoryField";
import AdminEditCompatibilityField from "../Field/Compatibility/CompatibilityField";
import AdminField from "../Field/Field";
import AdminFileLinkField from "../Field/FileLinkField";
import AdminEditImageField from "../Field/ImageField";
import AdminEditPublisherField from "../Field/PublisherField";
import AdminStoreLinkField from "../Field/StoreLinkField";
import Input from "../Inputs/Input";
import AdminEditCategorySelectDialog from "./CategorySelect/CategorySelectDialog";
import AdminEditHead from "./Head";
import style from '@styles/admin/edit.module.scss';
import { useState } from "react";
import { AssetBaseVO } from "@domiTypes/asset";
import Textarea from "../Inputs/Textarea";
import AdminEditThumbnailUploadDialog from "./Thumbnail/UploadDialog";
import AdminEditSizeField from "../Field/SizeField";
import VersionEditField from "../Field/Version/EditField";

type Props = {
    fields: AssetEditFieldStates,
    updated: boolean,
    onSave?: () => void
}

export default function AdminEditContent({ fields, updated, onSave }: Props) {
    const storelinkPlatformState = useState<AssetBaseVO['platform']>(null);
    const [ categorySelectPopup, setCategorySelectPopup ] = useState(false);
    const [ imageUploadPopup, setImageUploadPopup ] = useState(false);

    const handleOpenCategorySelect = function() {
        setCategorySelectPopup(true);
    }
    const handleCloseCategorySelect = function() {
        setCategorySelectPopup(false);
    }
    
    const handleOpenImageUpload = () => setImageUploadPopup(true);
    const handleCloseImageUpload = () => setImageUploadPopup(false);
    const handleAddImages = function(images: ThumbnailLocalVO[]) {
        fields.images[1]([ ...images, ...fields.images[0] ]);
        handleCloseImageUpload();
    }

    const handleCategoryChange = function(categoryId: number) {
        // -999는 분류되지 않음 이지롱~~~~
        fields.category[1](categoryId === -999 ? null : categoryId);
    }

    return <section className={style.content}>
        <AdminEditHead updated={updated} onSave={onSave} />

        <AdminField title="제목" required={true} className={style.field}>
            <Input placeholder="제목을 입력하세요." autoValue={fields.title} />
        </AdminField>

        <AdminFileLinkField className={style.field} value={fields.fileLink} />
        <AdminStoreLinkField className={style.field} value={fields.storeLink} platform={storelinkPlatformState} />
        {/* <VersionField className={style.field} value={fields.version} /> */}
        <VersionEditField className={style.field} current={fields.fileVersion} latest={fields.storeVersion} />
        <AdminEditSizeField  className={style.field} value={fields.fileSize}  />
        <AdminEditCategoryField className={style.field} categoryId={fields.category[0]} onEdit={handleOpenCategorySelect} />
        <AdminEditPublisherField className={style.field} platform={fields.platform} artist={fields.artist} />
        
        <AdminField title="등록일" className={style.field}>
            <Input type="date" autoValue={fields.createAt} />
        </AdminField>

        <AdminEditImageField className={style.field} state={fields.images} onAdd={handleOpenImageUpload} />
        <AdminEditCompatibilityField className={style.field} state={fields.supports} />

        <AdminField title="간단한 설명" className={style.field}>
            <Textarea className={style.skinTextarea} placeholder="간단한 설명을 입력하세요." autoValue={fields.shortDesc} />
        </AdminField>

        <AdminField title="설명" className={style.field}>
            <Textarea className={`${style.skinTextarea} ${style.big}`} placeholder="설명을 입력하세요." autoValue={fields.description} />
        </AdminField>

        <AdminEditCategorySelectDialog show={categorySelectPopup} onClose={handleCloseCategorySelect} onSelect={handleCategoryChange} />
        <AdminEditThumbnailUploadDialog show={imageUploadPopup} onClose={handleCloseImageUpload} onAdd={handleAddImages} />
    </section>
}
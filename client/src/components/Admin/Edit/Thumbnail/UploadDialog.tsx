import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditThumbnailUploadDialogSelect from './Select';

export default function AdminEditThumbnailUploadDialog() {
    return <Dialog title="썸네일 업로드" show={true} className={style.thumbnailUploadDialog}>
        <AdminEditThumbnailUploadDialogSelect />
    </Dialog>
}
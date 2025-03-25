import style from '@styles/admin/edit.module.scss';
import AdminField from "./Field";
import AdminEditGalleryAddBox from './Gallery/AddBox';
import AdminEditGalleryItem from './Gallery/Item';

type Props = {
    className?: string
}

export default function AdminEditImageField({ className }: Props) {
    return <AdminField title="썸네일" className={`${style.imageField} ${className || ''}`}>
        <section className={style.gallery}>
            <AdminEditGalleryAddBox />
            <AdminEditGalleryItem />
        </section>
    </AdminField>
}
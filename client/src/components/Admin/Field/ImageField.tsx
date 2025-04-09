import style from '@styles/admin/edit.module.scss';
import AdminField from "./Field";
import AdminEditGalleryAddBox from './Gallery/AddBox';
import AdminEditGalleryItem from './Gallery/Item';
import { ReactState } from '@domiTypes/react';
import { ThumbnailLocalVO } from '@domiTypes/assetEdit';

type Props = {
    className?: string,
    state: ReactState<ThumbnailLocalVO[]>,
    onAdd?: () => void
}

export default function AdminEditImageField({ className, state: [ images, setImages ], onAdd }: Props) {
    return <AdminField title="썸네일" className={`${style.imageField} ${className || ''}`}>
        <section className={style.gallery}>
            <AdminEditGalleryAddBox onClick={onAdd} />
            {images.map((v, i) => <AdminEditGalleryItem key={i} data={v} />)}
            {/* <AdminEditGalleryItem />
            <AdminEditGalleryItem /> */}
        </section>
    </AdminField>
}
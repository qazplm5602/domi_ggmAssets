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
    const handleItemMove = function(idx: number, left: boolean) {
        const newImages = [ ...images ];
        const item = newImages.splice(idx, 1);

        newImages.splice(idx + (left ? -1 : 1), 0, ...item);
        setImages(newImages);
    }
    const handleItemRemove = function(idx: number) {
        const newImages = [ ...images ];
        newImages.splice(idx, 1);
        
        setImages(newImages);
    }

    return <AdminField title="썸네일" className={`${style.imageField} ${className || ''}`}>
        <section className={style.gallery}>
            <AdminEditGalleryAddBox onClick={onAdd} />
            {images.map((v, i) => <AdminEditGalleryItem key={i} data={v} onMove={left => handleItemMove(i, left)} onRemove={() => handleItemRemove(i)} />)}
            {/* <AdminEditGalleryItem />
            <AdminEditGalleryItem /> */}
        </section>
    </AdminField>
}
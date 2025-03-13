import style from '@styles/assetDetail/style.module.scss';
import AssetDetailGalleryPreview from './GalleryPreview';
import AssetDetailGalleryList from './GalleryList';

export default function AssetDetailGallery() {
    return <div className={style.gallery}>
        <AssetDetailGalleryPreview />
        <AssetDetailGalleryList />
    </div>;
}
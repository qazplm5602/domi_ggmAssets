import style from '@styles/assetDetail/style.module.scss';
import AssetDetailGalleryArrow from './GalleryArrow';

export default function AssetDetailGalleryPreview() {
    return <div className={style.viewer}>
        <img src="https://assetstorev1-prd-cdn.unity3d.com/key-image/c01ce1fe-99e0-49f6-93ad-7499b15f120f.jpg" alt="thumbnail 1" />
        
        <AssetDetailGalleryArrow />
        <AssetDetailGalleryArrow right={true} />
    </div>;
}
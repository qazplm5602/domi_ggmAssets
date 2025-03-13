import AssetDetailHead from '@components/AssetDetail/Head';
import AssetDetailMore from '@components/AssetDetail/More/MoreDetail';
import AssetDetailPreviewContainer from '@components/AssetDetail/PreviewContainer';
import style from '@styles/assetDetail/style.module.scss';

export default function AssetDetail() {
    return <main>
        <img src="https://assetstorev1-prd-cdn.unity3d.com/key-image/c01ce1fe-99e0-49f6-93ad-7499b15f120f.jpg" alt="bg blur" className={style.bg_blur} draggable={false} />

        <section className={style.main}>
            <AssetDetailHead />
            <AssetDetailPreviewContainer />
            <AssetDetailMore />
        </section>
    </main>;
}
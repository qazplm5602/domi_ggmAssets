import style from '@styles/assetDetail/style.module.scss';

export default function AssetDetailGalleryList() {
    return <section className={style.list}>
        <button className={style.box}>
            <img src="https://assetstorev1-prd-cdn.unity3d.com/key-image/c01ce1fe-99e0-49f6-93ad-7499b15f120f.jpg" alt="thumbnail 1" />
        </button>
        <button className={`${style.box} ${style.disable}`}>
            <img src="https://assetstorev1-prd-cdn.unity3d.com/key-image/c01ce1fe-99e0-49f6-93ad-7499b15f120f.jpg" alt="thumbnail 1" />
        </button>
    </section>;
}
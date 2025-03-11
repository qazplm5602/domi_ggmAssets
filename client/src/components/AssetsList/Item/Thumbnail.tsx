import style from '@styles/assetsList/style.module.scss';
import AssetsListThumbnailArrowButton from './ArrowButton';

export default function AssetsListItemThumbnail() {
    return <section className={style.gallery}>
        <article className={style.list}>
            <img src="https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/c0ffba0f-6541-4dc7-9364-67ecb0e41367_scaled.jpg" alt="thumbnail 1" />
        </article>

        {/* <button className={stylze.btn}>
            <img src={rightArrow} alt="right arrow" />
        </button> */}
        
        <AssetsListThumbnailArrowButton />
        <AssetsListThumbnailArrowButton right={true} />
    </section>
}
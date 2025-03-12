import style from '@styles/assetsList/style.module.scss';
import assetsStoreLogo from '@assets/unity-assets-logo.svg';

export default function AssetItemInfo() {
    return <section className={style.info}>
        <article className={style.category}>
            <div>3D</div>
            <div>식물</div>
        </article>

        {/* 유니티??? itch io??? */}
        <img src={assetsStoreLogo} alt='unity assets store' className={style.logo} />
    </section>
}
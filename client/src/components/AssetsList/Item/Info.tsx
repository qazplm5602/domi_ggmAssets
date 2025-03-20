import style from '@styles/assetsList/style.module.scss';
import assetsStoreLogo from '@assets/unity-assets-logo.svg';
import { AssetPreviewVO } from '@domiTypes/asset';

type Props = {
    category: AssetPreviewVO['category'],
}

export default function AssetItemInfo({ category }: Props) {
    return <section className={style.info}>
        <article className={style.category}>
            {category && category.map(v => <div key={v.id}>{v.name}</div>)}
            {!category && <div>분류되지 않음</div>}
        </article>

        {/* 유니티??? itch io??? */}
        <img src={assetsStoreLogo} alt='unity assets store' className={style.logo} />
    </section>
}
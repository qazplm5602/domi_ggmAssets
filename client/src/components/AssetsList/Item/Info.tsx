import style from '@styles/assetsList/style.module.scss';


import { AssetPreviewVO } from '@domiTypes/asset';
import { getPlatformLogoURL } from '@utils/file';

type Props = {
    category: AssetPreviewVO['category'],
    platform: AssetPreviewVO['platform']
}

export default function AssetItemInfo({ category, platform }: Props) {
    return <section className={style.info}>
        <article className={style.category}>
            {category && category.map(v => <div key={v.id}>{v.name}</div>)}
            {!category && <div>분류되지 않음</div>}
        </article>

        {/* 유니티??? itch io??? */}
        {platform && <img src={getPlatformLogoURL(platform)} alt='unity assets store' className={style.logo} />}
    </section>
}
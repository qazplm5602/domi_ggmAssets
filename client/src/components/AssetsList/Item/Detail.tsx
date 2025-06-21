import style from '@styles/assetsList/style.module.scss';
import AssetItemDetailTag from './Tag';
import { FavoriteTagVO } from '@domiTypes/favoriteTag';

type Props = {
    publisher: string,
    title: string,
    tags: FavoriteTagVO[]
}

export default function AssetItemDetail({ publisher, title, tags }: Props) {
    return <section className={style.detail}>
        <div className={style.sub}>
            <p className={style.owner}>{publisher}</p>
            <section className={style.tags}>
                {tags.map(v => <AssetItemDetailTag key={v.id} color={v.color} name={v.name} />)}
            </section>
        </div>
        <h1>{title}</h1>
    </section>
}
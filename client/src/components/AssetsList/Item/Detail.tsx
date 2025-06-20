import style from '@styles/assetsList/style.module.scss';
import AssetItemDetailTag from './Tag';

type Props = {
    publisher: string,
    title: string
}

export default function AssetItemDetail({ publisher, title }: Props) {
    return <section className={style.detail}>
        <div className={style.sub}>
            <p className={style.owner}>{publisher}</p>
            <section className={style.tags}>
                <AssetItemDetailTag />
            </section>
        </div>
        <h1>{title}</h1>
    </section>
}
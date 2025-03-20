import style from '@styles/assetsList/style.module.scss';

type Props = {
    publisher: string,
    title: string
}

export default function AssetItemDetail({ publisher, title }: Props) {
    return <section className={style.detail}>
        <div className={style.owner}>{publisher}</div>
        <h1>{title}</h1>
    </section>
}
import style from '@styles/assetDetail/style.module.scss';

type Props = {
    title: string,
    category: string
}

export default function AssetDetailHead({ title, category }: Props) {
    return <article className={style.head}>
        <h1>{title}</h1>
        
        <section className={style.category}>
            <p>Unity 필수에셋</p>    
            <div className={style.line}></div>
            <p>자습서</p>
        </section>
    </article>;
}
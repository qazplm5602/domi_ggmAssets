import style from '@styles/admin/style.module.scss';

type Props = {
    required?: boolean
    title: string,
    desc?: React.ReactNode
}

export default function AdminFieldHead({ title, desc, required }: Props) {
    return <section className={style.head}>
        {required && <div className={style.small}>* 필수</div>}
        <h3>{title}</h3>
        <p className={style.desc}>{desc}</p>
    </section>;
}
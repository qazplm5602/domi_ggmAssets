// import style from '@styles/assetDetail/style.module.scss';

type Props = {
    title: string
    children?: React.ReactNode,
    className?: string
}

export default function AssetDetailMoreSection({ title, children, className }: Props) {
    return <section>
        <h2>{title}</h2>
        <div className={className}>{children}</div>
    </section>
}
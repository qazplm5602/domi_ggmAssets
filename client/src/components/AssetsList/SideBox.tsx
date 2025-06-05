import style from '@styles/assetsList/style.module.scss';

type Props = {
    children?: React.ReactNode,
    title?: React.ReactNode,
    footer?: React.ReactNode
}

export default function AssetsListSideBox({ title, children, footer }: Props) {
    return <div className={style.side_box}>
        {typeof title === "string" ? <h1>{title}</h1> : title}
        <div className={style.content}>
            {children}
        </div>
        {footer}
    </div>
}
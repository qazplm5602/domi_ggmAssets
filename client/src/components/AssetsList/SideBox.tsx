import style from '@styles/assetsList/style.module.scss';

type Props = {
    children?: React.ReactNode,
    title?: string
}

export default function AssetsListSideBox({ title, children }: Props) {
    return <div className={style.side_box}>
        {title && <h1>{title}</h1>}
        <div className={style.content}>
            {children}
        </div>
    </div>
}
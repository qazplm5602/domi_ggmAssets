import style from '@styles/assetDetail/style.module.scss';

type Props = {
    title: string,
    value: string
}

export default function AssetDetailInfoText({ title, value }: Props) {
    return <div className={style.box}>
        <h3>{title}</h3>
        <div>{value}</div>
    </div>;
}
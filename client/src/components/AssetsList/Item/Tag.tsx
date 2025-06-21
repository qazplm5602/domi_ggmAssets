import style from '@styles/assetsList/style.module.scss';

type Props = {
    color: string,
    name: string
}

export default function AssetItemDetailTag({ color, name }: Props) {
    return <div className={style.item} style={{ backgroundColor: `#${color}` }}>
        <div className={style.tooltip}>{name}</div>
    </div>;
}
import style from '@styles/assetsList/style.module.scss';

type Props = {
    current: number,
    max: number
}

export default function AssetsListThumbnailPageAmount({ current, max }: Props) {
    return <div className={style.page}>{current}<span>/{max}</span></div>;
}
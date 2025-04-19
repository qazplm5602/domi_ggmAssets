import style from '@styles/assetDetail/style.module.scss';
import AssetDetailInfoInteractionFavoriteBtn from './FavoriteBtn';


type Props = {
    download: string,
    assetId: number
}

export default function AssetDetailInfoInteraction({ download, assetId }: Props) {
    return <section className={style.interactions}>
        <a className={style.download} href={download} target='_blank'>다운로드</a>
        <AssetDetailInfoInteractionFavoriteBtn id={assetId} />
    </section>
}
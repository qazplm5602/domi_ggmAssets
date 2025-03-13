import style from '@styles/home/style.module.scss';
import HomeAssetsBoxHead from './Head';
import AssetItem from '@components/AssetsList/Item/Item';

export default function HomeAssetsBox() {
    return <div className={style.box}>
        <HomeAssetsBoxHead />
        
        {/* 리스트 */}
        <article className={style.list}>
            <AssetItem className={style.item} />
            <AssetItem className={style.item} />
            <AssetItem className={style.item} />
            <AssetItem className={style.item} />
            <AssetItem className={style.item} />
            <AssetItem className={style.item} />
        </article>
    </div>
}
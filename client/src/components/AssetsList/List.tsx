import style from '@styles/assetsList/style.module.scss';
import AssetItem from './Item/Item';

export default function AssetsListContainer() {
    return <section className={style.itemContainer}>
        <AssetItem />
        <AssetItem />
        <AssetItem />
        <AssetItem />
        <AssetItem />
    </section>;
}
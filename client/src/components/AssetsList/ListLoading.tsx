import style from '@styles/assetsList/style.module.scss';
import AssetItemLoading from './Item/ItemLoading';

// 로딩 에셋 박스 뜨는 갯수
const ITEM_AMOUNT = 8;

export default function AssetsListLoadingContainer() {
    return <section className={style.itemContainer}>
        {Array.from(new Array(ITEM_AMOUNT)).map((_, i) => <AssetItemLoading key={i} delay={50 * i} />)}
    </section>;
}
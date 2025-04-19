import AssetItemAnim from '@components/AssetsList/Item/ItemAnim';
import AssetsListLoadingContainer from '@components/AssetsList/ListLoading';
import { AssetPreviewVO } from '@domiTypes/asset';
import style from '@styles/assetsList/style.module.scss';

type Props = {
    list: AssetPreviewVO[] | null
}

export default function FavoriteBaseList({ list }: Props) {
    if (list === null)
        return <AssetsListLoadingContainer />;

    return <section className={style.itemContainer}>
        {list.map((v, i) => <AssetItemAnim key={v.id} idx={i} data={v} />)}
    </section>;
}
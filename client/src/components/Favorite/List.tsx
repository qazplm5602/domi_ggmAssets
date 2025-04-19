import originStyle from '@styles/assetsList/style.module.scss';
import ItemSelectable from './ItemSelectable';
import { AssetPreviewVO } from '@domiTypes/asset';
import AssetsListLoadingContainer from '@components/AssetsList/ListLoading';

type Props = {
    list: AssetPreviewVO[] | null,
    selects: Set<number>,
    onSelect?: (id: number) => void
}

export default function FavoriteSelectList({ list, selects, onSelect }: Props) {
    const handleAssetClick = function(id: number) {
        if (onSelect)
            onSelect(id);
    }

    if (list === null)
        return <AssetsListLoadingContainer />;

    return <section className={originStyle.itemContainer}>
        {list.map((v, i) => <ItemSelectable key={v.id} select={selects.has(v.id)} data={v} idx={i} onClick={() => handleAssetClick(v.id)} />)}
    </section>
}
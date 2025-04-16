import originStyle from '@styles/assetsList/style.module.scss';
import ItemSelectable from './ItemSelectable';
import { AssetPreviewVO } from '@domiTypes/asset';
import AssetsListLoadingContainer from '@components/AssetsList/ListLoading';

type Props = {
    list: AssetPreviewVO[] | null,
    selects: Set<number>
}

export default function FavoriteSelectList({ list, selects }: Props) {


    if (list === null)
        return <AssetsListLoadingContainer />;

    return <section className={originStyle.itemContainer}>
        {list.map(v => <ItemSelectable key={v.id} select={selects.has(v.id)} data={v} />)}
    </section>
}
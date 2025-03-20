import style from '@styles/assetsList/style.module.scss';
import { useEffect, useState } from 'react';
import { useAssetSearchOption } from './hook';
import { AliveType } from '@domiTypes/alive';
import { request } from '@utils/request';
import { AssetPreviewVO } from '@domiTypes/asset';
import { PageContentVO } from '@domiTypes/page';
import AssetsListLoadingContainer from './ListLoading';
import AssetItemAnim from './Item/ItemAnim';

type Props = {
    onChangeMaxPage?: (amount: number | null) => void
}

export default function AssetsListContainer({ onChangeMaxPage }: Props) {
    const { amount, category, order, page } = useAssetSearchOption();
    const [ data, setData ] = useState<PageContentVO<AssetPreviewVO> | null>(null);
    
    const onLoad = async function(aliveRef: AliveType) {
        setData(null);
        
        if (onChangeMaxPage)
            onChangeMaxPage(null);
        
        const result = await request<PageContentVO<AssetPreviewVO>>("asset/search", { params: { amount, category, order, page } });
        if (!aliveRef.alive) return;

        setData(result.data);

        if (onChangeMaxPage)
            onChangeMaxPage(result.data.size);
    }

    useEffect(() => {
        const aliveRef = { alive: true };

        onLoad(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, [ amount, category, order, page ]);

    if (data === null)
        return <AssetsListLoadingContainer />;

    return <section className={style.itemContainer}>
        {data.items.map((v, i) => <AssetItemAnim key={v.title} idx={i + 1} />)}
    </section>;
}
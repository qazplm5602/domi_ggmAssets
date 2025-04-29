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
        const result = await request<PageContentVO<AssetPreviewVO>>("asset/search", { params: { amount, category, order, page: Number(page) - 1 } });
        if (!aliveRef.alive) return;

        setData(result.data);

        if (onChangeMaxPage)
            onChangeMaxPage(result.data.size);
    }

    const onDataClear = function() {
        setData(null);
        
        if (onChangeMaxPage)
            onChangeMaxPage(null);
    }

    useEffect(() => {
        const aliveRef = { alive: true };

        onLoad(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, [ amount, category, order, page ]);

    useEffect(onDataClear, [ amount, category ]);

    if (data === null)
        return <AssetsListLoadingContainer />;

    return <section className={style.itemContainer}>
        {data.items.map((v, i) => <AssetItemAnim key={v.id} idx={i + 1} data={v} />)}
        {data.items.length === 0 && <div className={style.alert}>검색 결과가 없습니다.</div>}
    </section>;
}
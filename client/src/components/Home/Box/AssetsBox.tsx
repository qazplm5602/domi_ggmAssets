import style from '@styles/home/style.module.scss';
import HomeAssetsBoxHead from './Head';
import AssetItem from '@components/AssetsList/Item/Item';

import { AnimationProps, motion } from 'framer-motion';
import { CategoryVO } from '@domiTypes/category';
import { request } from '@utils/request';
import { useState } from 'react';
import { AssetPreviewVO } from '@domiTypes/asset';
import { useHandleAlive } from '@utils/requestEventHook';
import { AliveType } from '@domiTypes/alive';
import { PageContentVO } from '@domiTypes/page';
import AssetItemLoading from '@components/AssetsList/Item/ItemLoading';

const INIT_STYLE: AnimationProps['initial'] = {
    y: 50,
    opacity: 0
}
const NOW_STYLE: AnimationProps['animate'] = {
    y: 0,
    opacity: 1
}

const ASSET_AMOUNT = 8;

type Props = {
    category: CategoryVO
}

export default function HomeAssetsBox({ category }: Props) {
    const [ assets, setAssets ] = useState<AssetPreviewVO[] | null>(null);
    
    const handleLoad = async function(aliveRef: AliveType) {
        const result = await request<PageContentVO<AssetPreviewVO>>("asset/search", { params: { category: category.id, amount: ASSET_AMOUNT } });

        if (!aliveRef.alive) return;

        setAssets(result.data.items);
    }

    useHandleAlive(handleLoad, [ category ]);

    return <motion.div initial={INIT_STYLE} animate={NOW_STYLE} className={style.box}>
        <HomeAssetsBoxHead title={category.name} id={category.id} />
        
        {/* 리스트 */}
        <article className={style.list}>
            {assets
                ? assets.map(v => <AssetItem className={style.item} key={v.id} data={v} />)
                : Array.from(new Array(ASSET_AMOUNT)).map((_, i) => <AssetItemLoading className={style.item} key={i} />)
            }
        </article>
    </motion.div>
}
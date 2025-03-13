import style from '@styles/home/style.module.scss';
import HomeAssetsBoxHead from './Head';
import AssetItem from '@components/AssetsList/Item/Item';

import { AnimationProps, motion } from 'framer-motion';

const INIT_STYLE: AnimationProps['initial'] = {
    y: 50,
    opacity: 0
}
const NOW_STYLE: AnimationProps['animate'] = {
    y: 0,
    opacity: 1
}

export default function HomeAssetsBox() {
    return <motion.div initial={INIT_STYLE} animate={NOW_STYLE} className={style.box}>
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
    </motion.div>
}
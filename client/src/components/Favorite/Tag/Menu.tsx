import style from '@styles/favorite/style.module.scss';
import FavoriteSelectHeadTagItem from './Item';
import { AnimatePresence, motion } from 'framer-motion';
import { useBodyClickEvent } from '@utils/hook';
import { useFavoriteTagList } from './Context';
import { AssetPreviewVO } from '@domiTypes/asset';
import { useMemo } from 'react';

const ANIM = {
    enter: { opacity: 1, bottom: -5 },
    exit: { opacity: 0, bottom: 5 },
    transition: { duration: 0.2 }
}

type Props = {
    show?: boolean,
    assets: AssetPreviewVO[] | null,
    selects: Set<number>,
    onClose?: () => void,
}

type CheckType = Parameters<typeof FavoriteSelectHeadTagItem>['0']['check'];

export default function FavoriteSelectHeadTagMenu({ show = true, assets, selects, onClose }: Props) {
    const [ tags ] = useFavoriteTagList();

    const indexedAssets = useMemo(() => {
        const result: { [key: number]: AssetPreviewVO } = {};
        assets?.forEach(v => {
            result[v.id] = v;
        });
        
        return result;
    }, [ assets ]);

    const selectStatus = useMemo(() => {
        const counts: { [key: string]: number } = {};
        const result: { [key: string]: CheckType } = {};

        selects.forEach(id => {
            indexedAssets[id]?.tags.forEach(() => {
                const count = counts[id] || 0;
                counts[id] = count + 1;
            });
        });
        
        for (const [id, count] of Object.entries(counts)) {
            result[id] = count === selects.size ? 'all' : 'half';
        }
        return result;
    }, [ tags, indexedAssets, selects ]);
    

    const handleBoxClick = function(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
    }

    const handleTagClick = async function(id: string) {
        const isActive = selectStatus[id] !== "empty";

    }

    useBodyClickEvent(onClose);

    return <AnimatePresence>
        {show && <motion.section className={style.tagMenu} initial={ANIM.exit} animate={ANIM.enter} exit={ANIM.exit} transition={ANIM.transition} onClick={handleBoxClick}>
            {tags?.map(v => <FavoriteSelectHeadTagItem key={v.id} name={v.name} color={v.color} check={selectStatus[v.id] || 'empty'} onClick={() => handleTagClick(v.id)} />)}
        </motion.section>}
    </AnimatePresence>;
}
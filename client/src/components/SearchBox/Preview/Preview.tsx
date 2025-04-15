import style from '@styles/searchBox/style.module.scss';
import SearchPreviewBox from './Box';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '@components/Spinner/Spinner';
import { useEffect, useState } from 'react';
import { AssetSearchVO } from '@domiTypes/asset';
import { AliveType } from '@domiTypes/alive';
import { request } from '@utils/request';


type Props = {
    className?: string,
    // show?: boolean,
    focus: boolean,
    search: string
}

const INIT_ANIM = { opacity: 0, translate: "-50% 0", scale: 0.95 };
const FINISH_ANIM = { opacity: 1, translate: "-50% 0", scale: 1.0 };
const TRANSITION_ANIM = { duration: 0.15 };

export default function SearchPreview({ className, focus, search }: Props) {
    const show = focus && search.length > 0;
    const [ list, setList ] = useState<AssetSearchVO[] | null>(null);

    const loadData = async function(aliveRef: AliveType) {
        const response = await request<AssetSearchVO[]>("asset/search/preview", { params: { v: search } });
        if (!aliveRef.alive) return;

        setList(response.data);
    }

    useEffect(() => {
        if (search.length === 0) return;
        
        const aliveRef = { alive: true };
        const timeHandler = setTimeout(() => loadData(aliveRef), 1000);
        
        setList(null);

        return () => {
            clearTimeout(timeHandler);
            aliveRef.alive = false;
        }
    }, [ search ]);
    
    return <AnimatePresence>
        {show && <Box className={className} data={list} />}
    </AnimatePresence>;
}

function Box({ className, data }: { className?: string, data: AssetSearchVO[] | null }) {
    return <motion.div className={`${style.preview} ${className || ''}`} initial={INIT_ANIM} animate={FINISH_ANIM} exit={INIT_ANIM} transition={TRANSITION_ANIM}>
        {data && data.map(v => <SearchPreviewBox key={v.id} data={v} />)}
        {!data && <Spinner className={style.spinner} />}
    </motion.div>;
}
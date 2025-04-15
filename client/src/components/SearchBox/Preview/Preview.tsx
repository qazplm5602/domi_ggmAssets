import style from '@styles/searchBox/style.module.scss';
import SearchPreviewBox from './Box';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '@components/Spinner/Spinner';


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
    const show = focus;
    
    return <AnimatePresence>
        {show && <Box className={className} />}
    </AnimatePresence>;
}

function Box({ className }: { className?: string }) {
    return <motion.div className={`${style.preview} ${className || ''}`} initial={INIT_ANIM} animate={FINISH_ANIM} exit={INIT_ANIM} transition={TRANSITION_ANIM}>
        <SearchPreviewBox />
        <SearchPreviewBox />
        <SearchPreviewBox />
        <Spinner className={style.spinner} />
    </motion.div>;
}
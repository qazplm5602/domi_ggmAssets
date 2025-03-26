import style from '@styles/dialog/style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import DialogHead from './Head';

type Props = {
    className?: string,
    children?: React.ReactNode,
    show: boolean,
    title: string,
    onClose?: () => void
}

const ANIM_TRANSITION = {
    duration: 0.2
}

export default function Dialog({ title, show, className, onClose, children }: Props) {
    const handleBackgroundClick = function() {
        if (onClose)
            onClose();
    }

    const handleBoxClick = function(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }

    return <AnimatePresence>
        {show && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={ANIM_TRANSITION} className={style.blackBG} onClick={handleBackgroundClick}>
            <motion.div initial={{ zoom: 0.9 }} animate={{ zoom: 1 }} exit={{ zoom: 0.9 }} transition={ANIM_TRANSITION} className={`${style.box} ${className || ''}`} onClick={handleBoxClick}>
                <DialogHead title={title} onClose={handleBackgroundClick} />
                {children}
            </motion.div>
        </motion.div>}
    </AnimatePresence>;
}
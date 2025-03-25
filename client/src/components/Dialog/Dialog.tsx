import style from '@styles/dialog/style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import DialogHead from './Head';

type Props = {
    className?: string,
    children?: React.ReactNode,
    show: boolean,
    title: string
}

export default function Dialog({ title, show, className, children }: Props) {
    return <AnimatePresence>
        <motion.div className={style.blackBG}>
            <motion.div className={`${style.box} ${className || ''}`}>
                <DialogHead title={title} />
                {children}
            </motion.div>
        </motion.div>
    </AnimatePresence>;
}
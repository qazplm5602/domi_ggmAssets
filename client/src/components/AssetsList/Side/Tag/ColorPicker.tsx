import style from '@styles/assetsList/side.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const ANIM = {
    enter: { opacity: 1, right: -3 },
    exit: { opacity: 0, right: 6 },
    transition: { duration: 0.1 }
}

type Props = {
    show?: boolean,
    onClose?: () => void
}

export default function AssetsListSideTagColorPicker({ show, onClose }: Props) {
    return <AnimatePresence>
        {show && <motion.div className={style.colorPicker} initial={ANIM.exit} animate={ANIM.enter} exit={ANIM.exit}>
            <button style={{ backgroundColor: "#FF8800" }}></button>
            <button style={{ backgroundColor: "#FF8800" }}></button>
            <button style={{ backgroundColor: "#FF8800" }}></button>
            <button style={{ backgroundColor: "#FF8800" }}></button>
        </motion.div>}
    </AnimatePresence>;
}
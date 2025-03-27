import { motion, AnimatePresence } from "framer-motion";
import PopupBox from "./Box";
import { usePopupStore } from "./store"
import style from '@styles/popup/style.module.scss';

const ANIM_TRANSITION = {
    duration: 0.2
}

export default function Popup() {
    const { show } = usePopupStore();
    
    return <AnimatePresence>
        {show && <motion.div key="domi-popup" className={style.bg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={ANIM_TRANSITION}>
            <PopupBox />
        </motion.div>}
    </AnimatePresence>;
}
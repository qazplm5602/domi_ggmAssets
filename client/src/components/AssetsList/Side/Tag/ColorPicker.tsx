import style from '@styles/assetsList/side.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const ANIM = {
    enter: { opacity: 1, right: -3 },
    exit: { opacity: 0, right: 6 },
    transition: { duration: 0.1 }
}

const COLOR_PRESET = [
    "4571fb", // 파랑
    "3db86d", // 초록
    "e05f42", // 빨강
    "ffb55b", // 주황
    "a258ff", // 보랑
    "838383" // 그레이 (색이야)
]

type Props = {
    show?: boolean,
    onClose?: () => void,
    onSelect?: (color: string) => void
}

export default function AssetsListSideTagColorPicker({ show, onSelect, onClose }: Props) {
    const handleBodyClick = function() {
        if (onClose)
            onClose();
    }
    
    const handleBoxClick = function(e: React.MouseEvent) {
        e.stopPropagation();
    }
    
    const handleColorClick = function(color: string) {
        if (onSelect)
            onSelect(color);

        handleBodyClick();
    }

    useEffect(() => {
        if (!show) return;

        document.body.addEventListener("click", handleBodyClick);
        return () => document.body.removeEventListener("click", handleBodyClick);
    }, [ show ]);
    
    return <AnimatePresence>
        {show && <motion.div className={style.colorPicker} initial={ANIM.exit} animate={ANIM.enter} exit={ANIM.exit} onClick={handleBoxClick}>
            {COLOR_PRESET.map(v => <button key={v} style={{ backgroundColor: `#${v}` }} onClick={() => handleColorClick(v)} />)}
        </motion.div>}
    </AnimatePresence>;
}
import style from '@styles/popup/style.module.scss';
import { usePopupStore } from './store';
import { motion } from "framer-motion";
import Button from '@components/Buttons/Button';

const ANIM_TRANSITION = {
    duration: 0.2
}

export default function PopupBox() {
    const { title, content, interaction, closePopup } = usePopupStore();

    const onClick = function(idx: number) {
        closePopup();
        const cb = interaction[idx];
        
        if (!cb) {
            throw new Error(`popup 버튼을 찾을 수 없습니다. idx: ${idx}`);
        }

        cb.callback();
    }
    
    return <motion.div className={style.box} initial={{ zoom: 0.95 }} animate={{ zoom: 1 }} exit={{ zoom: 0.95 }} transition={ANIM_TRANSITION}>
        <h1>{title}</h1>
        <section className={style.content}>
            {content}
        </section>
        
        <section className={style.interaction}>
            {interaction.map((v, i) => <Button key={v.text} style={{ background: v.color }} onClick={() => onClick(i)}>{v.text}</Button>)}
        </section>
    </motion.div>;
}
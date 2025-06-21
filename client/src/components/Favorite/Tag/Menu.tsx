import style from '@styles/favorite/style.module.scss';
import FavoriteSelectHeadTagItem from './Item';
import { AnimatePresence, motion } from 'framer-motion';
import { useBodyClickEvent } from '@utils/hook';
import { useFavoriteTagList } from './Context';

const ANIM = {
    enter: { opacity: 1, bottom: -5 },
    exit: { opacity: 0, bottom: 5 },
    transition: { duration: 0.2 }
}

type Props = {
    show?: boolean,
    onClose?: () => void
}

export default function FavoriteSelectHeadTagMenu({ show = true, onClose }: Props) {
    const [ tags ] = useFavoriteTagList();

    const handleBoxClick = function(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
    }

    useBodyClickEvent(onClose);

    return <AnimatePresence>
        {show && <motion.section className={style.tagMenu} initial={ANIM.exit} animate={ANIM.enter} exit={ANIM.exit} transition={ANIM.transition} onClick={handleBoxClick}>
            {tags?.map(v => <FavoriteSelectHeadTagItem key={v.id} name={v.name} color={v.color} check='empty' />)}
        </motion.section>}
    </AnimatePresence>;
}
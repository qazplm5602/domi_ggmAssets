import style from '@styles/assetDetail/style.module.scss';
import { motion } from 'framer-motion';

type Props = {
    title: string,
    category: string
}

export default function AssetDetailHead({ title, category }: Props) {
    return <motion.article className={style.head} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'tween', duration: 0.3 }}>
        <h1>{title}</h1>
        
        <section className={style.category}>
            <p>Unity 필수에셋</p>    
            <div className={style.line}></div>
            <p>자습서</p>
        </section>
    </motion.article>;
}
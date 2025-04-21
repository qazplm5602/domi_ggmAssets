import style from '@styles/home/style.module.scss';

import ggmLogo from '@assets/ggmLow.webp';
import Head from '../../components/Home/Head';
import HomeContent from '../../components/Home/Content';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MetaTag from '@components/MetaTag/MetaTag';

export default function Home() {
    return <main className={style.main}>
        <MetaTag title='Home' />
        
        <motion.img src={ggmLogo} alt="ggm" className={style.bg_blur} initial={{opacity: 0}} animate={{opacity: 0.3}} transition={{ duration: 0.5 }} />
        <Head />

        <HomeContent />

        <Link to="/assets" className={style.all_btn}>모두 보기</Link>
    </main>
}
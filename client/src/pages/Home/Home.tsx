import style from '@styles/home/style.module.scss';

import ggmLogo from '@assets/ggmLow.webp';
import Head from '../../components/Home/Head';
import HomeContent from '../../components/Home/Content';
import { Link } from 'react-router-dom';

export default function Home() {
    return <main className={style.main}>
        <img src={ggmLogo} alt="ggm" className={style.bg_blur} />
        <Head />

        <HomeContent />

        <Link to="/assets" className={style.all_btn}>모두 보기</Link>
    </main>
}
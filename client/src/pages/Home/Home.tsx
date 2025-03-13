import style from '@styles/home/style.module.scss';

import ggmLogo from '@assets/ggmLow.webp';
import Head from '../../components/Home/Head';
import HomeContent from '../../components/Home/Content';

export default function Home() {
    return <main className={style.main}>
        <img src={ggmLogo} alt="ggm" className={style.bg_blur} />
        <Head />

        <HomeContent />
    </main>
}
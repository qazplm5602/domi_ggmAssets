import style from '@styles/home/style.module.scss';

import ggmLogo from '@assets/ggmLow.webp';
import Head from './Head';

export default function Home() {
    return <main>
        <img src={ggmLogo} alt="ggm" className={style.bg_blur} />
        <Head />

        
    </main>
}
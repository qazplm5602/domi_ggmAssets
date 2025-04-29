import style from '@styles/login/style.module.scss';

import sirokoBg from '@assets/gamebg/sunaookami-shiroko.webp';
import sannabiBg from '@assets/gamebg/sanabi.webp';
import { useState } from 'react';

export default function LoginBackground() {
    const [ loaded, setLoaded ] = useState(false);

    const handleLoad = function() {
        setLoaded(true);
    }

    return <img src={sannabiBg} className={`${style.background} ${loaded ? '' : style.hide}`} onLoad={handleLoad} alt='login' />;
}
import style from '@styles/login/style.module.scss';
import { useState } from 'react';

import sirokoBg from '@assets/gamebg/sunaookami-shiroko.webp';
import sannabiBg from '@assets/gamebg/sanabi.webp';
import dungeonAndFighterBg from '@assets/gamebg/DungeonAndFighter.webp';
import genshinImpactBg from '@assets/gamebg/genshin-impact.webp';
import limbusBg from '@assets/gamebg/wp12370192-limbus-company-wallpapers.webp';
import ZZZBg from '@assets/gamebg/ZenlessZoneZero.webp';
import { generateRandomNumber } from '@utils/misc';


const IMAGE_LIST = [
    sirokoBg,
    sannabiBg,
    dungeonAndFighterBg,
    genshinImpactBg,
    limbusBg,
    ZZZBg
]

export default function LoginBackground() {
    const [ loaded, setLoaded ] = useState(false);
    const [ idx ] = useState(generateRandomNumber(0, IMAGE_LIST.length - 1));

    const handleLoad = function() {
        setLoaded(true);
    }

    return <img src={IMAGE_LIST[idx]} className={`${style.background} ${loaded ? '' : style.hide}`} onLoad={handleLoad} alt='login' />;
}
import LoginBox from '@components/LoginBox/LoginBox';
import style from '@styles/login/style.module.scss';

import sirokoBg from '@assets/gamebg/sunaookami-shiroko.webp';

export default function Login() {
    return <main className={style.container}>
        <img src={sirokoBg} className={style.background} alt='login' />
        <LoginBox />
        <div className={style.license}>ⓒ 2025. domi All rights reserved.</div>
    </main>
}
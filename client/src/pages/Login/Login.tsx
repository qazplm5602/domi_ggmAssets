import LoginBox from '@components/LoginBox/LoginBox';
import style from '@styles/login/style.module.scss';

import LoginBackground from '@components/LoginBox/Background';

export default function Login() {
    return <main className={style.container}>
        <LoginBackground />
        <LoginBox />
        <div className={style.license}>ⓒ 2025. domi All rights reserved.</div>
    </main>
}
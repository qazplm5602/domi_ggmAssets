import LoginBox from '@components/LoginBox/LoginBox';
import style from '@styles/login/style.module.scss';

export default function Login() {
    return <main className={style.container}>
        <LoginBox />
    </main>
}
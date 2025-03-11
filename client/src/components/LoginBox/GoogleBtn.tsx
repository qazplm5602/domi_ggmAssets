import style from '@styles/login/style.module.scss';

import googleLogo from '@assets/google-logo.webp';

export default function LoginBoxGoogleBtn() {
    return <a href="/oauth2/authorization/google" className={style.btn}>
        <img src={googleLogo} alt="google logo" />
        <div>Google 로그인</div>
    </a>
}
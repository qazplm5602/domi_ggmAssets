import style from '@styles/login/style.module.scss';

export default function LoginBoxGoogleBtn() {
    return <a href="/oauth2/authorization/google" className={style.legacy}>
        기존 Google 계정으로 로그인
    </a>
}
import style from '@styles/login/style.module.scss';
import logoImage from '@assets/logo.webp';
import LoginBoxGoogleBtn from './GoogleBtn';

export default function LoginBox() {
    return <div className={style.box}>
        <img src={logoImage} alt="logo" className={style.logo} />
        <h1>환영합니다.</h1>

        <p>이 사이트는 교직원 및 재학생만 사용할 수 있습니다.</p>
        <p>해당 서비스를 이용하려면 학교 계정으로 로그인 하시길 바랍니다.</p>
    
        {/* 로구인 버튼 */}
        <LoginBoxGoogleBtn />
    </div>;
}
import style from '@styles/header/style.module.scss';
import logoutIcon from '@assets/reload.svg';
import useLoginStore from '@components/LoginState/store';
import { request } from '@utils/request';

export default function HeaderInteraction() {
    const loginStore = useLoginStore();

    const handleLogin = async function() {
        // 로그아웃 해줘잉
        await request("user/logout");
        loginStore.forceRefresh();

        // 이 이후에는 알아서 로그인 페이지로 갈꺼임
    }

    return <section className={style.right}>
        <button className={style.exit} onClick={handleLogin}>
            <img src={logoutIcon} alt="logout btn" />
        </button>
    </section>;
}
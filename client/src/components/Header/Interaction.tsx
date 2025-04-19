import style from '@styles/header/style.module.scss';
import logoutIcon from '@assets/reload.svg';
import useLoginStore from '@components/LoginState/store';
import { request } from '@utils/request';
import { useSWRConfig } from 'swr';
import { useNavigate } from 'react-router-dom';

export default function HeaderInteraction() {
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();
    const loginStore = useLoginStore();

    const handleLogin = async function() {
        // 로그아웃 해줘잉
        await request("user/logout");

        loginStore.forceRefresh();
        mutate('user/@me');
        navigate("/login");
    }

    return <section className={style.right}>
        <button className={style.exit} onClick={handleLogin}>
            <img src={logoutIcon} alt="logout btn" />
        </button>
    </section>;
}
import style from '@styles/header/style.module.scss';
import logoImg from '@assets/logo.webp';
import { Link } from 'react-router-dom';
import useLoginStore from '@components/LoginState/store';

const MENU_LIST = [
    ["목록", "assets"],
    ["나의 에셋", "domilove"],
    ["관리", "admin"]
]

export default function HeaderMain() {
    const { admin } = useLoginStore();

    return <section className={style.left}>
        <Link to="/">
            <img src={logoImg} alt="ggm logo" className={style.logo} />
        </Link>

        <article className={style.menus}>
            {MENU_LIST.map(menu => {
                const isAdmin = menu[1] === "admin";
                if (isAdmin && !admin)
                    return;

                return <Link to={menu[1]} className={location.pathname.startsWith(`/${menu[1]}`) ? style.active : ''}>
                    {isAdmin && <div className={style.admin}></div>}
                    {menu[0]}
                </Link>;
            })}
        </article>
    </section>;
}
import style from '@styles/header/style.module.scss';
import logoImg from '@assets/logo.webp';
import { Link } from 'react-router-dom';
import useLoginStore from '@components/LoginState/store';

const MENU_LIST = [
    ["목록", "assets"],
    ["나의 에셋", "domilove"]
]

export default function HeaderMain() {
    const { admin } = useLoginStore();

    return <section className={style.left}>
        <Link to="/">
            <img src={logoImg} alt="ggm logo" className={style.logo} />
        </Link>

        <article className={style.menus}>
            {MENU_LIST.map(menu => <Link to={menu[1]}>{menu[0]}</Link>)}
            {admin && <Link to="/admin">
                <div className={style.admin}></div>
                관리
            </Link>}
        </article>
    </section>;
}
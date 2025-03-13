import style from '@styles/header/style.module.scss';
import logoImg from '@assets/logo.webp';
import { Link } from 'react-router-dom';

const MENU_LIST = [
    ["목록", "assets"],
    ["나의 에셋", "domilove"]
]

export default function HeaderMain() {
    return <section className={style.left}>
        <Link to="/">
            <img src={logoImg} alt="ggm logo" className={style.logo} />
        </Link>

        <article className={style.menus}>
            {MENU_LIST.map(menu => <Link to={menu[1]}>{menu[0]}</Link>)}
        </article>
    </section>;
}
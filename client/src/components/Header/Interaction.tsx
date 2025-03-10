import style from '@styles/header/style.module.scss';
import logoutIcon from '@assets/reload.svg';
import { Link } from 'react-router-dom';

export default function HeaderInteraction() {
    return <section className={style.right}>
        <Link to="/logout" className={style.exit}>
            <img src={logoutIcon} alt="logout btn" />
        </Link>
    </section>;
}
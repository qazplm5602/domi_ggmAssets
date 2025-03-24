import { Link } from "react-router-dom";
import style from '@styles/admin/menu.module.scss';

type Props = {
    page: string,
    icon: string,
    title: string,
    desc?: string
}

export default function AdminMenuItem({ title, desc, icon, page }: Props) {
    return <Link to={`/admin/${page}`}>
        <div className={style.menu}>
            <div className={style.icon}>
                <img src={icon} alt="menu icon" />
            </div>

            <section className={style.detail}>
                <h2>{title}</h2>
                <p>{desc}</p>
            </section>
        </div>
    </Link>
}
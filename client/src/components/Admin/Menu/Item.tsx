import { Link } from "react-router-dom";
import style from '@styles/admin/menu.module.scss';

import uploadIcon from '@assets/icons/upload.svg';

export default function AdminMenuItem() {
    return <Link to="/admin/upload">
        <div className={style.menu}>
            <div className={style.icon}>
                <img src={uploadIcon} alt="menu icon" />
            </div>

            <section className={style.detail}>
                <h2>에셋 등록</h2>
                <p>목록에 새롭게 에셋을 추가 합니다.</p>
            </section>
        </div>
    </Link>
}
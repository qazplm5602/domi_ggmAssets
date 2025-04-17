import style from '@styles/notFound/style.module.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return <main className={style.main}>
        <img src="" alt='not found' />
        <p>해당 페이지는 없거나<span>(머리 아님)</span> 삭제되었습니다.</p>
        
        <Link to="/" className={style.home}>홈으로</Link>
    </main>;
}
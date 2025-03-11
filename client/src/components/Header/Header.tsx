import style from '@styles/header/style.module.scss';
import HeaderInteraction from './Interaction';
import HeaderMain from './Main';
import SearchBox from '@components/SearchBox/SearchBox';
import { useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    // 로그인 화면은 헤더가 안보여야 함
    if (location.pathname.startsWith("/login"))
        return;
    
    return <header className={style.main}>
        <HeaderMain />
        <SearchBox className={style.search} />
        <HeaderInteraction />
    </header>;
}
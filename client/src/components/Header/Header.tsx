import style from '@styles/header/style.module.scss';
import HeaderInteraction from './Interaction';
import HeaderMain from './Main';
import SearchBox from '@components/SearchBox/SearchBox';

export default function Header() {
    return <header className={style.main}>
        <HeaderMain />
        <SearchBox className={style.search} />
        <HeaderInteraction />
    </header>;
}
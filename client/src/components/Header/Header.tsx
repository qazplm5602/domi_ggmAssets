import style from '@styles/header/style.module.scss';
import HeaderInteraction from './Interaction';
import HeaderMain from './Main';

export default function Header() {
    return <header className={style.main}>
        <HeaderMain />
        <HeaderInteraction />
    </header>;
}
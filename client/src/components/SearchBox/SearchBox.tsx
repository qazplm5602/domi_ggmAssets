import style from '@styles/searchBox/style.module.scss';
import searchIco from '@assets/ic-round-search.svg';
import closeIco from '@assets/ic-sharp-clear.svg';

type Props = {
    className?: string
}

export default function SearchBox({ className }: Props) {
    return <div className={`${style.box} ${className || ''}`}>
        <img src={searchIco} alt="search ico" />
        <input type="text" placeholder='검색' />

        <button className={style.clear}>
            <img src={closeIco} alt="clear icon" />
        </button>
    </div>;
}
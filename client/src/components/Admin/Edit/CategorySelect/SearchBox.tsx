import style from '@styles/admin/edit.module.scss';
import searchIco from '@assets/ic-round-search.svg';

export default function AdminEditCategorySelectSearchBox() {
    return <div className={style.searchBox}>
        <img src={searchIco} alt="search icon" className={style.icon} />
        <input type="text" placeholder='검색' />
    </div>
}
import style from '@styles/admin/edit.module.scss';
import searchIco from '@assets/ic-round-search.svg';
import { ReactState } from '@domiTypes/react';

type Props = {
    value: ReactState<string>
}

export default function AdminEditCategorySelectSearchBox({ value: [ value, setValue ] }: Props) {
    const handleValueChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return <div className={style.searchBox}>
        <img src={searchIco} alt="search icon" className={style.icon} />
        <input type="text" placeholder='검색' value={value} onChange={handleValueChange} />
    </div>
}
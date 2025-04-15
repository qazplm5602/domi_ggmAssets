import style from '@styles/searchBox/style.module.scss';
import searchIco from '@assets/ic-round-search.svg';
import closeIco from '@assets/ic-sharp-clear.svg';
import { ReactState } from '@domiTypes/react';

type Props = {
    className?: string,
    // onFocus?: () => void,
    // onBlur?: () => void,
    autoValue: ReactState<string>,
    autoFocus: ReactState<boolean>
}

export default function SearchBox({ className, autoValue: [ value, setValue ], autoFocus: [ _, setFocus ] }: Props) {
    const handleFocus = function() {
        setFocus(true);
    }
    const handleBlur = function() {
        setFocus(false);
    }
    const handleInputChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }
    
    return <div className={`${style.box} ${className || ''}`}>
        <img src={searchIco} alt="search ico" />
        <input type="text" placeholder='검색' value={value} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />

        <button className={style.clear}>
            <img src={closeIco} alt="clear icon" />
        </button>
    </div>;
}
import SearchPreview from '@components/SearchBox/Preview/Preview';
import SearchBox from '@components/SearchBox/SearchBox';
import style from '@styles/header/style.module.scss';
import { useState } from 'react';

export default function HeaderSearch() {
    const valueState = useState("");
    const focusState = useState(false);

    return <>
        <SearchBox className={style.search} autoValue={valueState} autoFocus={focusState} />
        <SearchPreview className={style.search_preview} focus={focusState[0]} search={valueState[0]} />
    </>;
}
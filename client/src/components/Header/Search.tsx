import SearchPreview from '@components/SearchBox/Preview/Preview';
import SearchBox from '@components/SearchBox/SearchBox';
import style from '@styles/header/style.module.scss';

export default function HeaderSearch() {
    return <>
        <SearchBox className={style.search} />
        <SearchPreview className={style.search_preview} />
    </>;
}
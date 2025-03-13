import style from '@styles/searchBox/style.module.scss';
import SearchPreviewBox from './Box';

type Props = {
    className?: string
}

export default function SearchPreview({ className }: Props) {
    return <div className={`${style.preview} ${className || ''}`}>
        <SearchPreviewBox />
        <SearchPreviewBox />
        <SearchPreviewBox />
    </div>;
}
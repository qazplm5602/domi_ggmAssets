import style from '@styles/favorite/style.module.scss';
import FavoriteSelectHeadTagItem from './Item';

export default function FavoriteSelectHeadTagMenu() {
    return <section className={style.tagMenu}>
        <FavoriteSelectHeadTagItem />
        <FavoriteSelectHeadTagItem />
        <FavoriteSelectHeadTagItem />
        <FavoriteSelectHeadTagItem />
    </section>;
}
import style from '@styles/favorite/style.module.scss';

import likeIcon from '@assets/icons/ic-round-bookmarks.svg';
import Button from '@components/Buttons/Button';

export default function FavoriteHead() {
    return <section className={style.contentHead}>
        <article>
            <img src={likeIcon} alt="favorite mark" className={style.icon} />
            <h1>찜한 에셋들</h1>
        </article>

        <Button>선택</Button>
    </section>
}
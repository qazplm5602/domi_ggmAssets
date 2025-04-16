import style from '@styles/favorite/style.module.scss';

import likeIcon from '@assets/icons/ic-round-bookmarks.svg';
import Button from '@components/Buttons/Button';

type Props = {
    onSelect?: () => void,
    selecting: boolean
}

export default function FavoriteHead({ onSelect, selecting }: Props) {
    return <section className={style.contentHead}>
        <article>
            <img src={likeIcon} alt="favorite mark" className={style.icon} />
            <h1>찜한 에셋들</h1>
        </article>

        <Button onClick={onSelect}>선택{selecting ? ' 해제' : ''}</Button>
    </section>
}
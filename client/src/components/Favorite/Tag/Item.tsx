import style from '@styles/favorite/style.module.scss';
import lineIcon from '@assets/icons/horizontal-line.svg';

export default function FavoriteSelectHeadTagItem() {
    return <button className={style.tag}>
        <div className={style.status}>
            <img src={lineIcon} alt="status line" draggable={false} />
        </div>
        <p>테스트</p>
    </button>;
}
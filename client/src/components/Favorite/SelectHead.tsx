import Button from '@components/Buttons/Button';
import style from '@styles/favorite/style.module.scss';
import FavoriteSelectHeadCheck from './SelectHeadCheck';

export default function FavoriteSelectHead() {
    return <section className={style.selectHead}>
        <article className={style.left}>
            <FavoriteSelectHeadCheck />
            <div className={style.amount}>0개 선택함</div>
        </article>
        
        <article className={style.right}>
            <Button className={style.download}>다운로드</Button>
            <Button className={style.remove}>삭제</Button>
        </article>
    </section>
}
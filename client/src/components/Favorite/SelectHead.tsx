import Button from '@components/Buttons/Button';
import style from '@styles/favorite/style.module.scss';

export default function FavoriteSelectHead() {
    return <section className={style.selectHead}>
        <article className={style.left}>
            <div className={style.amount}>0개 선택함</div>
        </article>
        
        <article className={style.right}>
            <Button>다운로드</Button>
            <Button>삭제</Button>
        </article>
    </section>
}
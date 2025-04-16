import Button from '@components/Buttons/Button';
import style from '@styles/favorite/style.module.scss';
import FavoriteSelectHeadCheck from './SelectHeadCheck';
import { formatNumberWithCommas } from '@utils/misc';

type Props = {
    selects: Set<number>
}

export default function FavoriteSelectHead({ selects }: Props) {
    return <section className={style.selectHead}>
        <article className={style.left}>
            <FavoriteSelectHeadCheck />
            <div className={style.amount}>{formatNumberWithCommas(selects.size)}개 선택함</div>
        </article>
        
        <article className={style.right}>
            <Button className={style.download}>다운로드</Button>
            <Button className={style.remove}>삭제</Button>
        </article>
    </section>
}
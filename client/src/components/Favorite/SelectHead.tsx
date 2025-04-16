import Button from '@components/Buttons/Button';
import style from '@styles/favorite/style.module.scss';
import FavoriteSelectHeadCheck from './SelectHeadCheck';
import { formatNumberWithCommas } from '@utils/misc';
import { AssetPreviewVO } from '@domiTypes/asset';

type Props = {
    selects: Set<number>,
    assets: AssetPreviewVO[] | null,
    onCheck?: (check: boolean) => void
}

export default function FavoriteSelectHead({ selects, assets, onCheck }: Props) {
    const allChecked = assets !== null &&  assets.length > 0 && selects.size === assets.length;

    return <section className={style.selectHead}>
        <article className={style.left}>
            <FavoriteSelectHeadCheck all={allChecked} active={allChecked || selects.size > 0} onChange={onCheck} />
            <div className={style.amount}>{formatNumberWithCommas(selects.size)}개 선택함</div>
        </article>
        
        <article className={style.right}>
            <Button className={style.download}>다운로드</Button>
            <Button className={style.remove}>삭제</Button>
        </article>
    </section>
}
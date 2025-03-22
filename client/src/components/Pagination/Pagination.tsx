import style from '@styles/assetsList/style.module.scss';
import arrowRight from '@assets/icons/arrow-left.svg';

type Props = {
    current: number,
    maxPage: number,
    amount?: number,
    onChangePage?: (idx: number) => void
}

export default function Pagination({ current, maxPage, amount = 5, onChangePage }: Props) {
    const pages: number[] = [];

    let startIdx = Math.max(1, current - Math.floor(amount / 2));
    let endIdx = Math.min(maxPage, startIdx + amount - 1);

    // 머야 왜 다 안나와
    if (endIdx - startIdx < amount) {
        const diff = endIdx - startIdx;
        startIdx = Math.max(1, startIdx - (amount - diff) + 1);
    }

    for (let i = startIdx; i <= endIdx; i++) {
        pages.push(i);
    }

    const handleChangePage = function(idx: number) {
        if (onChangePage)
            onChangePage(idx);
    }
    const handlePrev = function() {
        handleChangePage(startIdx - 1);
    }
    const handleNext = function() {
        handleChangePage(endIdx + 1);
    }

    return <section className={style.pagination}>
        {startIdx > 1 && <button onClick={handlePrev}><img src={arrowRight} /></button>}
        {pages.map(idx => <button onClick={() => handleChangePage(idx)} className={idx === current ? style.active : ''} key={idx}>{idx}</button>)}
        {endIdx < maxPage && <button onClick={handleNext}><img className={style.reverseD} src={arrowRight} /></button>}
    </section>;
}
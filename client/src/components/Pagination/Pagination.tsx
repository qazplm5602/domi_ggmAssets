import style from '@styles/assetsList/style.module.scss';
import arrowRight from '@assets/icons/arrow-left.svg';

export default function Pagination() {
    return <section className={style.pagination}>
        <button><img src={arrowRight} /></button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button className={style.active}>4</button>
        <button>5</button>
        <button><img className={style.reverseD} src={arrowRight} /></button>
    </section>;
}
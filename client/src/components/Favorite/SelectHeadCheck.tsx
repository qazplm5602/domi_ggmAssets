import style from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';

export default function FavoriteSelectHeadCheck() {
    return <>
        <input type="checkbox" id='domitest' className={style.check} />
        <label htmlFor="domitest" className={style.check_design}>
            <img src={checkIcon} draggable={false} alt='check' />
        </label>
    </>;
}
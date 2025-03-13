import checkStyle from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';
// import lineIcon from '@assets/icons/horizontal-line.svg';

export default function FavoriteSelectHeadCheck() {
    return <>
        <input type="checkbox" id='domitest222' className={checkStyle.check} />
        <label htmlFor="domitest222" className={checkStyle.check_design}>
            <img src={checkIcon} draggable={false} alt='check' />
        </label>
    </>;
}
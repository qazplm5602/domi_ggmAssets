import checkStyle from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';
// import lineIcon from '@assets/icons/horizontal-line.svg';

type Props = {
    active: boolean,
    all: boolean
}

export default function FavoriteSelectHeadCheck({ active, all }: Props) {
    return <>
        <input type="checkbox" id='domitest222' className={checkStyle.check} />
        <label htmlFor="domitest222" className={checkStyle.check_design}>
            <img src={checkIcon} draggable={false} alt='check' />
        </label>
    </>;
}
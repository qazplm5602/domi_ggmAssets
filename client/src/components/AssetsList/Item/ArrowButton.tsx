import style from '@styles/assetsList/style.module.scss';
import leftArrow from '@assets/icons/ic-round-arrow-right.svg';

type Props = {
    right?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function AssetsListThumbnailArrowButton({ right, onClick }: Props) {
    return <button className={`${style.btn} ${right ? style.right : ''}`} onClick={onClick}>
        <img src={leftArrow} alt={`${right ? 'right': 'left'} arrow`} />
    </button>;
}
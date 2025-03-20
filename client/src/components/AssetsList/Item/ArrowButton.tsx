import style from '@styles/assetsList/style.module.scss';
import leftArrow from '@assets/icons/ic-round-arrow-right.svg';

type Props = {
    right?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean
}

export default function AssetsListThumbnailArrowButton({ right, onClick, disabled = false }: Props) {
    return <button className={`${style.btn} ${right ? style.right : ''}`} onClick={onClick} disabled={disabled}>
        <img src={leftArrow} alt={`${right ? 'right': 'left'} arrow`} />
    </button>;
}
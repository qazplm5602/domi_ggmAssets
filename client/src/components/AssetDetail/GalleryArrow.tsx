import style from '@styles/assetDetail/style.module.scss';
import leftIcon from '@assets/icons/arrow-left.svg';

type Props = {
    right?: boolean,
    onClick?: React.MouseEventHandler
}

export default function AssetDetailGalleryArrow({ right, onClick }: Props) {
    return <button className={`${style.arrow_btn} ${right ? style.right : ''}`} onClick={onClick}>
        <img src={leftIcon} alt="arrow" />
    </button>;
}
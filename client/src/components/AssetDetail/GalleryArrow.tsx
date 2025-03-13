import style from '@styles/assetDetail/style.module.scss';
import leftIcon from '@assets/icons/arrow-left.svg';

type Props = {
    right?: boolean
}

export default function AssetDetailGalleryArrow({ right }: Props) {
    return <button className={`${style.arrow_btn} ${right ? style.right : ''}`}>
        <img src={leftIcon} alt="arrow" />
    </button>;
}
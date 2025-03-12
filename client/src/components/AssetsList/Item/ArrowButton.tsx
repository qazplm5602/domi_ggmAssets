import style from '@styles/assetsList/style.module.scss';
import leftArrow from '@assets/icons/ic-round-arrow-right.svg';

type Props = {
    right?: boolean
}

export default function AssetsListThumbnailArrowButton({ right }: Props) {
    return <button className={`${style.btn} ${right ? style.right : ''}`}>
        <img src={leftArrow} alt={`${right ? 'right': 'left'} arrow`} />
    </button>;
}
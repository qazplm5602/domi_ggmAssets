import style from '@styles/assetDetail/more.module.scss';
import checkIcon from '@assets/icons/check.svg';

type Props = {
    active: boolean
}

export default function AssetDetailMoreCompatibilityCheck({ active }: Props) {
    return <div className={style.check}>
        <div className={style.icon}>
            <img src={checkIcon} alt="checkbox" />
        </div>

        <p>지원</p>
    </div>;
}
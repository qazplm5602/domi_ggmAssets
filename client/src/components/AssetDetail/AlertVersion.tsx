import errorIco from '@assets/icons/ic-outline-error-outline.svg';
import style from '@styles/assetDetail/style.module.scss';

type Props = {
    className?: string
}

export default function AssetDetailAlertVersion({ className }: Props) {
    return <div className={`${style.oldAlert} ${className || ''}`}>
        <img src={errorIco} alt="old version alert" />
        <p>등록된 파일이 최신 버전이 아닙니다.</p>
    </div>;
}
import errorIco from '@assets/icons/ic-outline-error-outline.svg';
import style from '@styles/assetDetail/style.module.scss';

export default function AssetDetailAlertVersion() {
    return <div className={style.oldAlert}>
        <img src={errorIco} alt="old version alert" />
        <p>등록된 파일 버전이 최신이 아닙니다.</p>
    </div>;
}
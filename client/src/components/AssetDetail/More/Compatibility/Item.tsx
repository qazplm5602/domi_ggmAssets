import style from '@styles/assetDetail/more.module.scss';
import AssetDetailMoreCompatibilityCheck from './Check';

export default function AssetDetailMoreCompatibilityItem() {
    return <article className={`${style.fill} ${style.item}`}>
        <div className={style.version}>6000.0.23f1</div>
        <AssetDetailMoreCompatibilityCheck active={true} />
        <AssetDetailMoreCompatibilityCheck active={true} />
        <AssetDetailMoreCompatibilityCheck active={true} />
    </article>;
}
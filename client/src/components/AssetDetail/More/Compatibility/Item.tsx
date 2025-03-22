import style from '@styles/assetDetail/more.module.scss';
import AssetDetailMoreCompatibilityCheck from './Check';
import { CompatibilityVO } from '@domiTypes/asset';

type Props = {
    data: CompatibilityVO
}

export default function AssetDetailMoreCompatibilityItem({ data }: Props) {
    return <article className={`${style.fill} ${style.item}`}>
        <div className={style.version}>{data.version}</div>
        <AssetDetailMoreCompatibilityCheck active={data.builtIn} />
        <AssetDetailMoreCompatibilityCheck active={data.urp} />
        <AssetDetailMoreCompatibilityCheck active={data.hdrp} />
    </article>;
}
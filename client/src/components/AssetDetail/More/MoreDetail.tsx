import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSimpleDesc from './SimpleDesc';
import AssetDetailMoreCompatibility from './Compatibility/MoreCompatibility';
import AssetDetailMoreFullDesc from './FullDesc';
import { AssetDetailVO } from '@domiTypes/asset';

type Props = {
    data: AssetDetailVO
}

export default function AssetDetailMore({ data }: Props) {
    return <article className={style.more}>
        {data.shortDesc && <AssetDetailMoreSimpleDesc content={data.shortDesc} />}
        <AssetDetailMoreCompatibility />
        <AssetDetailMoreFullDesc content={data.description || "설명이 없습니다."} />
    </article>;
}
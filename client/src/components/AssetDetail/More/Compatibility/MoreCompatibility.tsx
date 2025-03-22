import style from '@styles/assetDetail/more.module.scss';

import AssetDetailMoreSection from "../MoreSection";
import AssetDetailMoreCompatibilityHead from "./Head";
import AssetDetailMoreCompatibilityItem from "./Item";
import { CompatibilityVO } from '@domiTypes/asset';
import AssetDetailMoreCompatibilityIconText from "./IconText";
import questionIcon from '@assets/icons/question.svg';

type Props = {
    list: CompatibilityVO[]
}

export default function AssetDetailMoreCompatibility({ list }: Props) {
    return <AssetDetailMoreSection title="호환성" className={style.compatibility}>
        <AssetDetailMoreCompatibilityHead />

        {list.map(v => <AssetDetailMoreCompatibilityItem key={v.version} data={v} />)}
        {list.length === 0 && <AssetDetailMoreCompatibilityIconText icon={questionIcon} text="몰 ? 루" />}
    </AssetDetailMoreSection>;
}
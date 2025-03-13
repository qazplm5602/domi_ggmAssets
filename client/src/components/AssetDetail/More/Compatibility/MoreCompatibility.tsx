import style from '@styles/assetDetail/more.module.scss';

import AssetDetailMoreSection from "../MoreSection";
import AssetDetailMoreCompatibilityHead from "./Head";
import AssetDetailMoreCompatibilityItem from "./Item";
// import AssetDetailMoreCompatibilityIconText from "./IconText";

// import questionIcon from '@assets/icons/question.svg';


export default function AssetDetailMoreCompatibility() {
    return <AssetDetailMoreSection title="호환성" className={style.compatibility}>
        <AssetDetailMoreCompatibilityHead />

        <AssetDetailMoreCompatibilityItem />
        {/* <AssetDetailMoreCompatibilityIconText icon={questionIcon} text="몰 ? 루" /> */}
    </AssetDetailMoreSection>;
}
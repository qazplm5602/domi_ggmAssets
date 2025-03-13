import AssetDetailMoreSection from "../MoreSection";
import style from '@styles/assetDetail/more.module.scss';
import AssetDetailMoreCompatibilityHead from "./Head";
import AssetDetailMoreCompatibilityItem from "./Item";


export default function AssetDetailMoreCompatibility() {
    return <AssetDetailMoreSection title="호환성" className={style.compatibility}>
        <AssetDetailMoreCompatibilityHead />

        <AssetDetailMoreCompatibilityItem />
    </AssetDetailMoreSection>;
}
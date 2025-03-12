import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSection from "./MoreSection";


export default function AssetDetailMoreSimpleDesc() {
    return <AssetDetailMoreSection title="간단한 설명" className={style.default_words}>
        간단한 설명 - ㅁㄴㅇㄹ
    </AssetDetailMoreSection>
}
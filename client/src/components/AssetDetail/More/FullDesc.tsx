import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSection from './MoreSection';

export default function AssetDetailMoreFullDesc() {
    return <AssetDetailMoreSection title="설명" className={`${style.default_words} ${style.pre}`}>
        {`아무 설명 ㅁㄴㅇㄹ`}
    </AssetDetailMoreSection>
}
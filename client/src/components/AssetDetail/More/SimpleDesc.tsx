import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSection from "./MoreSection";

type Props = {
    content: string
}

export default function AssetDetailMoreSimpleDesc({ content }: Props) {
    return <AssetDetailMoreSection title="간단한 설명" className={style.default_words}>
        {content}
    </AssetDetailMoreSection>
}
import style from '@styles/assetDetail/style.module.scss';
import AssetDetailMoreSection from './MoreSection';

type Props = {
    content: string
}

export default function AssetDetailMoreFullDesc({ content }: Props) {
    return <AssetDetailMoreSection title="설명" className={`${style.default_words} ${style.pre}`}>
        <div dangerouslySetInnerHTML={{ __html: content }} className={style.viewer}></div>
    </AssetDetailMoreSection>
}
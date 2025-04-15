import IconButton from '@components/Buttons/IconButton';
import style from '@styles/assetDetail/style.module.scss';

import markIcon from '@assets/icons/ic-bookmark-line.svg';

type Props = {
    download: string
}

export default function AssetDetailInfoInteraction({ download }: Props) {
    return <section className={style.interactions}>
        <a className={style.download} href={download} target='_blank'>다운로드</a>
        <IconButton icon={markIcon} size={23} />
    </section>
}
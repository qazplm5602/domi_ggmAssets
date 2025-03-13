import IconButton from '@components/Buttons/IconButton';
import style from '@styles/assetDetail/style.module.scss';

import markIcon from '@assets/icons/ic-bookmark-line.svg';

export default function AssetDetailInfoInteraction() {
    return <section className={style.interactions}>
        <button className={style.download}>다운로드</button>
        <IconButton icon={markIcon} size={23} />
    </section>
}
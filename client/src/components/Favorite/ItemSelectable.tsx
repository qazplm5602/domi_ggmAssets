import AssetItemAnim from '@components/AssetsList/Item/ItemAnim';
import { AssetPreviewVO } from '@domiTypes/asset';
import style from '@styles/favorite/style.module.scss';

type Props = {
    select?: boolean,
    data: AssetPreviewVO,
    onClick?: () => void,
    idx?: number
}

export default function ItemSelectable({ select, data, onClick, idx }: Props) {
    return <div className={`${style.selectable} ${select ? style.selected : ''}`} onClick={onClick}>
        <AssetItemAnim data={data} disableLink={true} idx={idx} />
    </div>;
}
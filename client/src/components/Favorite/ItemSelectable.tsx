import AssetItem from '@components/AssetsList/Item/Item';
import { AssetPreviewVO } from '@domiTypes/asset';
import style from '@styles/favorite/style.module.scss';

type Props = {
    select?: boolean,
    data: AssetPreviewVO,
    onClick?: () => void
}

export default function ItemSelectable({ select, data, onClick }: Props) {
    return <div className={`${style.selectable} ${select ? style.selected : ''}`} onClick={onClick}>
        <AssetItem data={data} disableLink={true} />
    </div>;
}
import AssetItem from '@components/AssetsList/Item/Item';
import { AssetPreviewVO } from '@domiTypes/asset';
import style from '@styles/favorite/style.module.scss';

type Props = {
    select?: boolean,
    data: AssetPreviewVO
}

export default function ItemSelectable({ select, data }: Props) {
    return <div className={`${style.selectable} ${select ? style.selected : ''}`}>
        <AssetItem data={data} />
    </div>;
}
import AssetItem from '@components/AssetsList/Item/Item';
import style from '@styles/favorite/style.module.scss';

type Props = {
    select?: boolean
}

export default function ItemSelectable({ select }: Props) {
    return <div className={`${style.selectable} ${select ? style.selected : ''}`}>
        <AssetItem />
    </div>;
}
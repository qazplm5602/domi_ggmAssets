import { AssetSearchOption } from '@domiTypes/asset';
import style from '@styles/assetsList/side.module.scss';
import { useAssetSearchOption, useSetAssetSearchOption } from '../hook';

type Props = {
    title: string,
    index: keyof AssetSearchOption,
    items: AssetsListSelectItem[]
}

export interface AssetsListSelectItem {
    text: string,
    value: string
}

export default function AssetsListSideSelect({ title, index, items }: Props) {
    const currentValue = useAssetSearchOption()[index];
    const setSearchOption = useSetAssetSearchOption();

    const handleChangeValue = function(e: React.ChangeEvent<HTMLSelectElement>) {
        setSearchOption({ [index]: e.target.value, page: '1' });
    }

    return <section className={style.select}>
        <h2>{title}</h2>
        
        <select value={currentValue} onChange={handleChangeValue}>
            {items.map(v => <option key={v.value} value={v.value}>{v.text}</option>)}
        </select>
    </section>
}
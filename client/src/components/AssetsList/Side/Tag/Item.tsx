import style from '@styles/assetsList/side.module.scss';
import CheckBoxColor from "@components/CheckBox/CheckBoxColor";
import { FavoriteTagVO } from '@domiTypes/favoriteTag';

type Props = {
    data: FavoriteTagVO,
    checked?: boolean,
    onToggle?: (value: boolean) => void
}

export default function AssetsListSideTagItem({ data, checked, onToggle }: Props) {
    // const id = useId();

    const handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        if (onToggle)
            onToggle(e.target.checked);
    }

    return <div className={`${style.checkContainer} ${style.tag}`}>
        <CheckBoxColor id={data.id} color={`#${data.color}`} checked={checked} onChange={handleChange} />
        <label htmlFor={data.id} className={style.text}>{data.name}</label>
    </div>;
}
import style from '@styles/assetsList/side.module.scss';
import CheckBoxColor from "@components/CheckBox/CheckBoxColor";
import { useId } from 'react';
import { FavoriteTagVO } from '@domiTypes/favoriteTag';

type Props = {
    data: FavoriteTagVO
}

export default function AssetsListSideTagItem({ data }: Props) {
    const id = useId();

    return <div className={`${style.checkContainer} ${style.tag}`}>
        <CheckBoxColor id={id} color={`#${data.color}`} />
        <label htmlFor={id} className={style.text}>{data.name}</label>
    </div>;
}
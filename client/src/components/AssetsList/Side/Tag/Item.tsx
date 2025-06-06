import style from '@styles/assetsList/side.module.scss';
import CheckBoxColor from "@components/CheckBox/CheckBoxColor";
import { useId } from 'react';

export default function AssetsListSideTagItem() {
    const id = useId();

    return <div className={`${style.checkContainer} ${style.tag}`}>
        <CheckBoxColor id={id} color='red' />
        <label htmlFor={id} className={style.text}>테스트222</label>
    </div>;
}
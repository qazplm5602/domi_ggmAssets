import CheckBox from "./CheckBox";
import style from '@styles/assetsList/side.module.scss';

type Props = {
    className?: string,
    name: string
};

export default function CheckBoxContainer({ id, name, className, ...props }: Props & Parameters<typeof CheckBox>['0']) {
    return <div className={`${style.checkContainer} ${className || ''}`} {...props}>
        <CheckBox id={id} />
        <label htmlFor={id} className={style.text}>{name}</label>
    </div>;
}
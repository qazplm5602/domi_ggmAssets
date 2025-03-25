import CheckBox from "@components/CheckBox/CheckBox";
import style from '@styles/admin/edit.module.scss';

type Props = {
    name: string
}

export default function AdminEditCompatibilityOption({ name }: Props) {
    return <div className={style.option}>
        <CheckBox id="domit" />
        <label htmlFor="domit" className={style.text}>{name}</label>
    </div>;
}
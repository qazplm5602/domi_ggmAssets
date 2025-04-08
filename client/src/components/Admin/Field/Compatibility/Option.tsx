import CheckBox from "@components/CheckBox/CheckBox";
import style from '@styles/admin/edit.module.scss';

type Props = {
    id: string,
    name: string,
    active?: boolean,
    onToggle?: (value: boolean) => void
}

export default function AdminEditCompatibilityOption({ id, name, active = false, onToggle }: Props) {
    // const id = `CompatibilityOption-${name}`;

    const handleCheckboxChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        if (onToggle)
            onToggle(e.target.checked);
    }

    return <div className={style.option}>
        <CheckBox id={id} checked={active} onChange={handleCheckboxChange} />
        <label htmlFor={id} className={style.text}>{name}</label>
    </div>;
}
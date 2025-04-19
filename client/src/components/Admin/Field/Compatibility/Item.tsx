import IconButton from '@components/Buttons/IconButton';
import style from '@styles/admin/edit.module.scss';

import closeIcon from '@assets/icons/close.svg';
import Input from '../../Inputs/Input';
import AdminEditCompatibilityOption from './Option';
import { CompatibilityVO } from '@domiTypes/asset';

type Props = {
    data: CompatibilityVO,
    idx: number,
    onChange?: (value: Partial<CompatibilityVO>) => void,
    onRemove?: () => void
}

export default function AdminEditCompatibilityItem({ data, idx, onChange, onRemove }: Props) {
    const triggerChange = function(value: Partial<CompatibilityVO>) {
        if (onChange)
            onChange(value);
    }

    const handleInputChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        triggerChange({ version: e.target.value });
    }

    return <div className={style.item}>
        <IconButton icon={closeIcon} className={style.removeBtn} onClick={onRemove} />
        <Input placeholder='버전' value={data.version} onChange={handleInputChange} />
        
        <section className={style.checks}>
            <AdminEditCompatibilityOption id={`compatiblityOption-${idx}-built`} name='Built-In' active={data.builtIn} onToggle={on => triggerChange({ builtIn: on })} />
            <AdminEditCompatibilityOption id={`compatiblityOption-${idx}-urp`} name='URP' active={data.urp} onToggle={on => triggerChange({ urp: on })} />
            <AdminEditCompatibilityOption id={`compatiblityOption-${idx}-gdrp`} name='HDRP' active={data.hdrp} onToggle={on => triggerChange({ hdrp: on })} />
        </section>
    </div>;
}
import IconButton from '@components/Buttons/IconButton';
import style from '@styles/admin/edit.module.scss';

import closeIcon from '@assets/icons/close.svg';
import Input from '../../Inputs/Input';
import AdminEditCompatibilityOption from './Option';
import { CompatibilityVO } from '@domiTypes/asset';

type Props = {
    onChange?: (value: Partial<CompatibilityVO>) => void,
    data: CompatibilityVO
}

export default function AdminEditCompatibilityItem({ data, onChange }: Props) {
    const triggerChange = function(value: Partial<CompatibilityVO>) {
        if (onChange)
            onChange(value);
    }

    const handleInputChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        triggerChange({ version: e.target.value });
    }

    return <div className={style.item}>
        <IconButton icon={closeIcon} className={style.removeBtn} />
        <Input placeholder='버전' value={data.version} onChange={handleInputChange} />
        
        <section className={style.checks}>
            <AdminEditCompatibilityOption name='Built-In' active={data.builtIn} onToggle={on => triggerChange({ builtIn: on })} />
            <AdminEditCompatibilityOption name='URP' active={data.urp} onToggle={on => triggerChange({ urp: on })} />
            <AdminEditCompatibilityOption name='HDRP' active={data.hdrp} onToggle={on => triggerChange({ hdrp: on })} />
        </section>
    </div>;
}
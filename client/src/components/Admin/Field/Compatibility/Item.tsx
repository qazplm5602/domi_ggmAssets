import IconButton from '@components/Buttons/IconButton';
import style from '@styles/admin/edit.module.scss';

import closeIcon from '@assets/icons/close.svg';
import Input from '../../Inputs/Input';
import AdminEditCompatibilityOption from './Option';

export default function AdminEditCompatibilityItem() {
    return <div className={style.item}>
        <IconButton icon={closeIcon} className={style.removeBtn} />
        <Input placeholder='버전' />
        
        <section className={style.checks}>
            <AdminEditCompatibilityOption name='Built-In' />
            <AdminEditCompatibilityOption name='URP' />
            <AdminEditCompatibilityOption name='HDRP' />
        </section>
    </div>;
}
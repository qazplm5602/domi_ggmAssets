import IconButton from '@components/Buttons/IconButton';
import style from '@styles/admin/category.module.scss';

import editIco from '@assets/icons/ic-baseline-create.svg';
import addIco from '@assets/icons/ic-round-add.svg';
import deleteIco from '@assets/icons/ic-baseline-delete.svg';

export default function AdminCategoryItem() {
    return <div className={style.item}>
        <section className={style.name}>
            <h3>3D</h3>
            <p>(100개)</p>
        </section>
        
        <section className={style.interaction}>
            <IconButton icon={editIco} />
            <IconButton icon={addIco} />
            <IconButton icon={deleteIco} />
        </section>
    </div>;
}
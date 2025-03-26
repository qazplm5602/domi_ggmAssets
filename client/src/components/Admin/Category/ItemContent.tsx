import style from '@styles/admin/category.module.scss';
import IconButton from '@components/Buttons/IconButton';

import editIco from '@assets/icons/ic-baseline-create.svg';
import addIco from '@assets/icons/ic-round-add.svg';
import deleteIco from '@assets/icons/ic-baseline-delete.svg';
import { formatNumberWithCommas } from '@utils/misc';

type Props = {
    name: string,
    count: number
}

export default function AdminCategoryItemContent({ name, count }: Props) {
    return <>
        <section className={style.name}>
            <h3>{name}</h3>
            <p>({formatNumberWithCommas(count)}개)</p>
        </section>
        
        <section className={style.interaction}>
            <IconButton icon={editIco} />
            <IconButton icon={addIco} />
            <IconButton icon={deleteIco} />
        </section>
    </>;
}
import CheckBoxContainer from '@components/CheckBox/Container';
import style from '@styles/admin/edit.module.scss';
import AdminEditAutoFieldDialogOptionRow from './Row';
import { AutoFieldCheckState } from '@domiTypes/assetAutoField';
import { useMemo } from 'react';

type Props = {
    checkStates: AutoFieldCheckState
}

export default function AdminEditAutoFieldDialogOption({ checkStates }: Props) {
    const allChecked = useMemo(() => Object.values(checkStates).every(v => v[0]), [ checkStates ]);

    return <article className={style.option}>
        <h3>옵션</h3>

        <section className={style.all}>
            <CheckBoxContainer id='autoField-All' name='전체' checked={allChecked} />
        </section>

        <AdminEditAutoFieldDialogOptionRow checkStates={checkStates} />
    </article>;
}
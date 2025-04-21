import CheckBoxContainer from '@components/CheckBox/Container';
import style from '@styles/admin/edit.module.scss';
import AdminEditAutoFieldDialogOptionRow from './Row';
import { AutoFieldCheckState } from '@domiTypes/assetAutoField';

type Props = {
    checkStates: AutoFieldCheckState
}

export default function AdminEditAutoFieldDialogOption({ checkStates }: Props) {
    return <article className={style.option}>
        <h3>옵션</h3>

        <section className={style.all}>
            <CheckBoxContainer id='autoField-All' name='전체' />
        </section>

        <AdminEditAutoFieldDialogOptionRow checkStates={checkStates} />
    </article>;
}
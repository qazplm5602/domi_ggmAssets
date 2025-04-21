import CheckBoxContainer from '@components/CheckBox/Container';
import style from '@styles/admin/edit.module.scss';

export default function AdminEditCategoryAutoFieldDialogOptionRow() {
    return <section className={style.row}>
        <article>
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
        </article>
        <article>
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
        </article>
        <article>
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
            <CheckBoxContainer id='autoField-All' name='전체' className={style.checkbox} />
        </article>
    </section>;
}
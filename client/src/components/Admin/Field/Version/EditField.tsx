import style from '@styles/admin/edit.module.scss';
import AdminVersionField from "./FieldSection";
import VersionBaseInput from './BaseInput';
import { ReactState } from '@domiTypes/react';

type Props = {
    className?: string,
    current: ReactState<string>,
    latest: ReactState<string>
}

export default function VersionEditField({ className, current, latest }: Props) {
    return <AdminVersionField className={className}>
        <section className={style.verticalField}>
            <h4>현재 버전</h4>
            <VersionBaseInput autoValue={current} />
        </section>
        <section className={`${style.verticalField} ${style.shortField}`}>
            <h4>최신 버전</h4>
            <VersionBaseInput autoValue={latest} />
        </section>
    </AdminVersionField>;
}
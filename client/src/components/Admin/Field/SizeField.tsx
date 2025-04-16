import style from '@styles/admin/upload.module.scss';

import AdminField from "./Field";
import Input from "../Inputs/Input";
import { ReactState } from '@domiTypes/react';

type Props = {
    value: ReactState<string>,
    className?: string
}

export default function AdminEditSizeField({ value, className }: Props) {
    return <AdminField title="파일 크기" desc='파일 크기가 표시됩니다. 단위는 byte 입니다.' className={`${style.version} ${className || ''}`}>
        <Input placeholder='크기를 입력하세요.' autoValue={value} type='number' />
    </AdminField>
}
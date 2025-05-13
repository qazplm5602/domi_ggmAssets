import style from '@styles/admin/upload.module.scss';

import AdminField from "./Field";
import Input from "../Inputs/Input";
import { ReactState } from '@domiTypes/react';

type Props = {
    className?: string,
    value: ReactState<string>
}

export default function VersionField({ className, value }: Props) {
    return <AdminField title="버전" desc='현재 파일 버전과 최신 버전을 비교하여, 구버전인 경우 경고 메시지를 표시합니다.' className={`${style.version} ${className || ''}`}>
        <Input placeholder='버전을 입력하세요.' autoValue={value} />
    </AdminField>
}
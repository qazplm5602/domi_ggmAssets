import style from '@styles/admin/upload.module.scss';

import AdminField from "./Field";
import Input from "../Inputs/Input";

export default function VersionField() {
    return <AdminField title="버전" desc='현재 파일 버전과 최신 버전을 비교하여, 구버전인 경우 경고 메시지를 표시합니다.' className={`${style.field} ${style.version}`}>
        <Input placeholder='버전을 입력하세요.' />
    </AdminField>
}
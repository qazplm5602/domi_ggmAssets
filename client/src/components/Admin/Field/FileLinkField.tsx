import style from '@styles/admin/upload.module.scss';

import AdminField from "./Field";
import Input from "../Inputs/Input";

export default function AdminFileLinkField() {
    return <AdminField title="다운로드 링크" desc='다운로드 버튼을 누르면 설정한 링크로 이동합니다.' required={true} className={style.field}>
        <Input placeholder='다운로드 링크를 입력하세요.' />
    </AdminField>
}
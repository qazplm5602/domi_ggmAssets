import style from '@styles/admin/upload.module.scss';

import AdminField from "./Field";
import Input from "../Inputs/Input";

import storeLogo from '@assets/unity-assets-logo.svg';
import questionIcon from '@assets/icons/question.svg';

export default function AdminStoreLinkField() {
    return <AdminField title="스토어 링크" desc='해당 URL을 통해 에셋 정보를 분석하고 적용합니다.' className={style.field}>
        <Input placeholder='스토어에 등록되어있는 에셋 링크를 입력하세요.' />
        
        <div className={style.detect}>
            <img src={storeLogo} alt="store logo" />
            <span>감지됨</span>
        </div>
    </AdminField>
}
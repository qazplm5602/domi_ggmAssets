import AdminField from "./Field";
import Input from "../Inputs/Input";
import { useEffect, useMemo } from "react";
import style from '@styles/admin/edit.module.scss';

type Props = {
    className?: string,
    value: [ string, React.Dispatch<React.SetStateAction<string>> ]
}

export default function AdminFileLinkField({ className, value }: Props) {
    const warningLink = useMemo(() => {
        const url = URL.parse(value[0]);
        
        if (!url)
            return true;

        // 구글 사이트가 아닌듯
        if (url.host !== "drive.google.com")
            return true;

        // 파일 uri가 아닌듯
        const startPath = '/file/d/';
        if (!url.pathname.startsWith(startPath))
            return true;

        const afterUri = url.pathname.substring(startPath.indexOf(startPath) + startPath.length);
        if (afterUri.length === 0) // 파일 id 가 없음
            return true;

        return false;
    }, [ value[0] ]);

    const handleChangeValue = function(e: React.ChangeEvent<HTMLInputElement>) {
        value[1](e.target.value);
    }

    return <AdminField title="다운로드 링크" desc='다운로드 버튼을 누르면 설정한 링크로 이동합니다.' required={true} className={`${style.fileLinkField} ${className || ''}`}>
        <Input placeholder='다운로드 링크를 입력하세요.' value={value[0]} onChange={handleChangeValue} />
        {warningLink && <div className={style.alert}>Google Drive 다운로드 파일 경로인지 확인해주세요.</div>}
    </AdminField>
}
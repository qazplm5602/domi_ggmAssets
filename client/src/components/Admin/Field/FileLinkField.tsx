import AdminField from "./Field";
import Input from "../Inputs/Input";

type Props = {
    className?: string
}

export default function AdminFileLinkField({ className }: Props) {
    return <AdminField title="다운로드 링크" desc='다운로드 버튼을 누르면 설정한 링크로 이동합니다.' required={true} className={className}>
        <Input placeholder='다운로드 링크를 입력하세요.' />
    </AdminField>
}
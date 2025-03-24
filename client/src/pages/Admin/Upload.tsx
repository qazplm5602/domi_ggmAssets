import AdminField from '@components/Admin/Field/Field';
import AdminHead from '@components/Admin/Head';
import Input from '@components/Admin/Inputs/Input';
import style from '@styles/admin/style.module.scss';

export default function AdminUpload() {
    return <main className={style.small_screen}>
        <AdminHead />
        
        <AdminField title="다운로드 링크" desc='다운로드 버튼을 누르면 설정한 링크로 이동합니다.' required={true}>
            <Input placeholder='다운로드 링크를 입력하세요.' />
        </AdminField>
    </main>;
}
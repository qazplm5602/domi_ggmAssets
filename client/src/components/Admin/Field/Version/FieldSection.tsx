import style from '@styles/admin/upload.module.scss';
import AdminField from '../Field';

type Props = {
    className?: string,
    children?: React.ReactNode
}

export default function AdminVersionField({ className, children, ...props }: Props & Omit<Parameters<typeof AdminField>['0'], "title"> ) {
    return <AdminField title="버전" desc='현재 파일 버전과 최신 버전을 비교하여, 구버전인 경우 경고 메시지를 표시합니다.' className={`${style.version} ${className || ''}`} {...props}>
        {children}
    </AdminField>;
}
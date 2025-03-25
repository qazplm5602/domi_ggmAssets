import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/edit.module.scss';
import AdminFieldHead from './Head';
import { Link } from 'react-router-dom';
import Button from '@components/Buttons/Button';

type Props = {
    className?: string
}

export default function AdminEditCategoryField({ className }: Props) {
    return <article className={`${baseStyle.field} ${style.categoryField} ${className || ''}`}>
        <AdminFieldHead title="카테고리" desc={<>카테고리를 추가하거나 삭제하려면 <Link to="/admin/category" className={style.link}>이곳</Link>으로 이동하세요.</>} />
        
        <section className={style.tags}>
            <p>3D / 모델 /</p>
            <span>자연환경</span>
        </section>
        
        <Button>수정</Button>
    </article>
}
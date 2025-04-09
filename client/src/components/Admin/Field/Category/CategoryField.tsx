import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/edit.module.scss';
import AdminFieldHead from '../Head';
import { Link } from 'react-router-dom';
import Button from '@components/Buttons/Button';
import { useEffect, useState } from 'react';
import { AliveType } from '@domiTypes/alive';
import { request } from '@utils/request';
import { CategoryVO } from '@domiTypes/category';
import CategoryFieldTags from './Tags';
import CategoryFieldTagsLoading from './Loading';

type Props = {
    className?: string,
    categoryId: number | null
}

export default function AdminEditCategoryField({ categoryId, className }: Props) {
    const [ names, setNames ] = useState<string[] | null>(null);
    
    const categoryParentsLoad = async function(aliveRef: AliveType) {
        const response = await request<CategoryVO[]>(`asset/category/admin/parents/${categoryId}`);
        
        if (!aliveRef.alive) return;
        
        setNames(response.data.map(v => v.name));
    }
    
    useEffect(() => {
        if (categoryId === null)  {
            setNames([ "분류되지 않음" ]); // 빈거
            return;
        }

        const aliveRef = { alive: true };
        categoryParentsLoad(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, [ categoryId ]);

    return <article className={`${baseStyle.field} ${style.categoryField} ${className || ''}`}>
        <AdminFieldHead title="카테고리" desc={<>카테고리를 추가하거나 삭제하려면 <Link to="/admin/category" className={style.link}>이곳</Link>으로 이동하세요.</>} />
        {names ? <CategoryFieldTags tags={names} /> : <CategoryFieldTagsLoading />}
        
        <Button>수정</Button>
    </article>
}
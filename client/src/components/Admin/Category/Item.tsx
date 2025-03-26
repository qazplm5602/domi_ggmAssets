import style from '@styles/admin/category.module.scss';
import AdminCategoryItemContent from './ItemContent';
import { CategoryOptionDTO } from '@domiTypes/category';
import { useEffect, useRef, useState } from 'react';
import AdminCategoryItemEditContent from './ItemEdit';

type Props = {
    // edit?: boolean
    category: CategoryOptionDTO
}

export default function AdminCategoryItem({ category }: Props) {
    const [ edit, setEdit ] = useState(category.local);
    const elementRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEdit = function() {
        setEdit(true);
    }
    
    const handleExitEdit = function() {
        setEdit(false);
    }
    
    const handleChangeName = function(newValue: string) {
        const value = newValue.trim();
        if (value.length === 0 || value === ' ') return;
        
        handleExitEdit();
    }
    
    useEffect(() => {
        if (!category.local || elementRef.current === null || inputRef.current === null) return;

        // 이거 처음 추가 한거잉
        inputRef.current.focus();
    }, [ category.id ]);

    return <div className={style.item} ref={elementRef}>
        {edit ? <AdminCategoryItemEditContent defaultValue={category.name} onSave={handleChangeName} onCancel={handleExitEdit} inputRef={inputRef} /> : <AdminCategoryItemContent name={category.name} count={category.count} onEdit={handleEdit} />}
    </div>;
}
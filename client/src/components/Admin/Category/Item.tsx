import style from '@styles/admin/category.module.scss';
import AdminCategoryItemContent from './ItemContent';
import { CategoryCountVO } from '@domiTypes/category';
import { useState } from 'react';
import AdminCategoryItemEditContent from './ItemEdit';

type Props = {
    // edit?: boolean
    category: CategoryCountVO
}

export default function AdminCategoryItem({ category }: Props) {
    const [ edit, setEdit ] = useState(false);

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

    return <div className={style.item}>
        {edit ? <AdminCategoryItemEditContent defaultValue={category.name} onSave={handleChangeName} onCancel={handleExitEdit} /> : <AdminCategoryItemContent name={category.name} count={category.count} onEdit={handleEdit} />}
    </div>;
}
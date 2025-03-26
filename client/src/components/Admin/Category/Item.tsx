import style from '@styles/admin/category.module.scss';
import AdminCategoryItemContent from './ItemContent';
import { AdminCategoryContextType, CategoryOptionDTO } from '@domiTypes/category';
import { useContext, useEffect, useRef, useState } from 'react';
import AdminCategoryItemEditContent from './ItemEdit';
import { AdminCategoryContext } from './Context';

type Props = {
    // edit?: boolean
    category: CategoryOptionDTO
}

export default function AdminCategoryItem({ category }: Props) {
    const [ edit, setEdit ] = useState(category.local);
    const { onChangeName, onAdd, onRemove } = useContext(AdminCategoryContext) as AdminCategoryContextType;
    const elementRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEdit = function() {
        setEdit(true);
    }
    
    const handleExitEdit = function() {
        setEdit(false);
        
        // 서버에 있는거 아닌데 저장 안하면 지워야징
        if (category.local && category.name.length === 0) {
            onRemove(category.id);
        }
    }
    
    const handleChangeName = function(newValue: string) {
        const value = newValue.trim();
        if (value.length === 0 || value === ' ') return;
        
        onChangeName(category.id, value);
        setEdit(false);
    }

    const handleAdd = function() {
        onAdd(category.id);
    }
    
    const handleRemove = function() {
        // 이건 한번 확인 하고 삭제 해야함
    }
    
    useEffect(() => {
        if (!category.local || elementRef.current === null || inputRef.current === null) return;

        // 이거 처음 추가 한거잉
        inputRef.current.focus();
    }, [ category.id ]);

    return <div className={style.item} ref={elementRef}>
        {edit ? <AdminCategoryItemEditContent defaultValue={category.name} onSave={handleChangeName} onCancel={handleExitEdit} inputRef={inputRef} /> : <AdminCategoryItemContent name={category.name} count={category.count} onEdit={handleEdit} onAdd={handleAdd} onRemove={handleRemove} />}
    </div>;
}
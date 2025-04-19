import style from '@styles/admin/category.module.scss';
import AdminCategoryItemContent from './ItemContent';
import { AdminCategoryContextType, CategoryOptionDTO } from '@domiTypes/category';
import { useContext, useEffect, useRef, useState } from 'react';
import AdminCategoryItemEditContent from './ItemEdit';
import { AdminCategoryContext } from './Context';
import { usePopupStore } from '@components/Popup/store';
import { formatNumberWithCommas } from '@utils/misc';

type Props = {
    // edit?: boolean
    category: CategoryOptionDTO
}

export default function AdminCategoryItem({ category }: Props) {
    const [ edit, setEdit ] = useState(category.local);
    const { onChangeName, onAdd, onRemove } = useContext(AdminCategoryContext) as AdminCategoryContextType;
    const elementRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { openPopup } = usePopupStore();

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
        const content =  <>
            <p>{category.name} 카테고리에 등록된 에셋은 총 {formatNumberWithCommas(category.count)}개입니다.</p>
            <p>삭제 시 해당 에셋들은 카테고리에서 제외되며, 하위 카테고리도 함께 삭제됩니다.</p>
        </>;

        openPopup("카테고리 삭제 확인", content, [
            { text: "삭제", color: "#D44760", callback: () => onRemove(category.id) },
            { text: "취소", callback() {} }
        ]);
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
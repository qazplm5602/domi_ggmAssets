import style from '@styles/admin/category.module.scss';
import IconButton from '@components/Buttons/IconButton';
import checkIco from '@assets/icons/check.svg';
import closeIco from '@assets/icons/close.svg';
import { useState } from 'react';

type Props = {
    onCancel?: () => void,
    onSave?: (newValue: string) => void
    defaultValue?: string,
    inputRef?: React.Ref<HTMLInputElement>
}

export default function AdminCategoryItemEditContent({ defaultValue, inputRef, onCancel, onSave }: Props) {
    const [ value, setValue ] = useState(defaultValue || '');

    const handleChangeValue = function(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    const handleSave = function() {
        if (onSave)
            onSave(value);
    }

    return <>
        <input type="text" ref={inputRef} className={style.rename} placeholder='카테고리 이름을 입력하세요.' value={value} onChange={handleChangeValue} />
        
        <section className={style.interaction}>
            <IconButton icon={checkIco} onClick={handleSave} />
            <IconButton icon={closeIco} onClick={onCancel} />
        </section>
    </>;
}
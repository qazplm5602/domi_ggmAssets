import Input from '@components/Admin/Inputs/Input';
import IconButton from '@components/Buttons/IconButton';
import style from '@styles/assetsList/side.module.scss';

import removeIcon from '@assets/icons/close.svg';
import AssetsListSideTagColorPicker from './ColorPicker';
import { FavoriteTagVO } from '@domiTypes/favoriteTag';
import { useState } from 'react';

type Props = {
    data: FavoriteTagVO
    onChangeColor?: (color: string) => void,
    onChangeName?: (value: string) => void,
    onRemove?: () => void,
}

export default function AssetsListSideTagItemEdit({ data, onChangeColor, onChangeName, onRemove }: Props) {
    const [ pickerShow, setPickerShow ] = useState(false);
    
    const handleInputChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChangeName)
            onChangeName(e.target.value);
    }

    const handlePickerOpen = function(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        setPickerShow(!pickerShow);
    }
    const handlePickerClose = function() {
        setPickerShow(false);
    }

    return <div className={`${style.tag} ${style.edit}`}>
        <button className={style.color} style={{ backgroundColor: `#${data.color}` }} onClick={handlePickerOpen}>
            <AssetsListSideTagColorPicker show={pickerShow} onClose={handlePickerClose} onSelect={onChangeColor} />
        </button>
        <Input placeholder='태그 이름' value={data.name} onChange={handleInputChange} />
        <IconButton icon={removeIcon} className={style.remove} onClick={onRemove} />
    </div>;
}
import Input from '@components/Admin/Inputs/Input';
import IconButton from '@components/Buttons/IconButton';
import style from '@styles/assetsList/side.module.scss';

import removeIcon from '@assets/icons/close.svg';
import AssetsListSideTagColorPicker from './ColorPicker';
import { FavoriteTagVO } from '@domiTypes/favoriteTag';

type Props = {
    data: FavoriteTagVO
    onChangeColor?: () => void,
    onChangeName?: (value: string) => void,
    onRemove?: () => void,
}

export default function AssetsListSideTagItemEdit({ data, onChangeColor, onChangeName, onRemove }: Props) {
    const handleInputChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChangeName)
            onChangeName(e.target.value);
    }

    return <div className={`${style.tag} ${style.edit}`}>
        <button className={style.color} style={{ backgroundColor: `#${data.color}` }}>
            <AssetsListSideTagColorPicker show={false} />
        </button>
        <Input placeholder='태그 이름' value={data.name} onChange={handleInputChange} />
        <IconButton icon={removeIcon} className={style.remove} onClick={onRemove} />
    </div>;
}
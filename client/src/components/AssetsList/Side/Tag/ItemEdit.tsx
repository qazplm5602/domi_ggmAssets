import Input from '@components/Admin/Inputs/Input';
import IconButton from '@components/Buttons/IconButton';
import style from '@styles/assetsList/side.module.scss';

import removeIcon from '@assets/icons/close.svg';

export default function AssetsListSideTagItemEdit() {
    return <div className={`${style.tag} ${style.edit}`}>
        <button className={style.color} />
        <Input placeholder='태그 이름' />
        <IconButton icon={removeIcon} className={style.remove} />
    </div>;
}
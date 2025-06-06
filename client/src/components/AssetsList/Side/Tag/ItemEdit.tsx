import Input from '@components/Admin/Inputs/Input';
import IconButton from '@components/Buttons/IconButton';
import style from '@styles/assetsList/side.module.scss';

export default function AssetsListSideTagItemEdit() {
    return <div className={`${style.tag} ${style.edit}`}>
        <div className={style.color} />
        <Input placeholder='이름을 입력하세요.' />
        <IconButton icon='' />
    </div>;
}
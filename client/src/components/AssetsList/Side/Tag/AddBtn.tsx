import style from '@styles/assetsList/side.module.scss';
import Button from "@components/Buttons/Button";

type Props = {
    onClick?: () => void;
}

export default function AssetsListSideTagAddBtn({ onClick }: Props) {
    return <Button className={style.tagAdd} onClick={onClick}>추가</Button>
}
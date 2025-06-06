import style from '@styles/assetsList/style.module.scss';
import AssetsListSideResultOption from './Side/ResultOption';
import AssetsListSideCategoryOption from './Side/CategoryOption';

type Props = {
    additional?: React.ReactNode
}

export default function SideSection({ additional }: Props) {
    return <article className={style.side}>
        <AssetsListSideResultOption />
        <AssetsListSideCategoryOption />
        {additional}
    </article>
}
import style from '@styles/assetsList/style.module.scss';
import AssetsListSideResultOption from './Side/ResultOption';
import AssetsListSideCategoryOption from './Side/CategoryOption';

export default function SideSection() {
    return <article className={style.side}>
        <AssetsListSideResultOption />
        <AssetsListSideCategoryOption />
    </article>
}
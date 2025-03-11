import style from '@styles/assetsList/style.module.scss';
import AssetsListSideResultOption from './Side/ResultOption';

export default function SideSection() {
    return <article className={style.side}>
        <AssetsListSideResultOption />
    </article>
}
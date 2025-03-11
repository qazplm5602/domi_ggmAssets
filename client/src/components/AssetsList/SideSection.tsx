import style from '@styles/assetsList/style.module.scss';
import AssetsListSideBox from './SideBox';

export default function SideSection() {
    return <article className={style.side}>
        <AssetsListSideBox title="검색 설정" />
    </article>
}
import AssetsListContainer from '@components/AssetsList/List';
import SideSection from '@components/AssetsList/SideSection';
import Pagination from '@components/Pagination/Pagination';
import style from '@styles/assetsList/style.module.scss';

export default function AssetsList() {
    return <main className={style.main}>
        {/* 카테고리 이런거 */}
        <SideSection />

        {/* 리스트 */}
        <article className={style.content}>
            <AssetsListContainer />
            <Pagination current={4} maxPage={6} />
        </article>
    </main>
}
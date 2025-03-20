import AssetsListContainer from '@components/AssetsList/List';
import AssetsListPaginationQuery from '@components/AssetsList/PaginationQuery';
import SideSection from '@components/AssetsList/SideSection';
import style from '@styles/assetsList/style.module.scss';

export default function AssetsList() {
    return <main className={style.main}>
        {/* 카테고리 이런거 */}
        <SideSection />

        {/* 리스트 */}
        <article className={style.content}>
            <AssetsListContainer />
            <AssetsListPaginationQuery max={null} />
        </article>
    </main>
}
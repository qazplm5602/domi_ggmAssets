import AssetsListContainer from '@components/AssetsList/List';
import AssetsListPaginationQuery from '@components/AssetsList/PaginationQuery';
import SideSection from '@components/AssetsList/SideSection';
import style from '@styles/assetsList/style.module.scss';
import { useState } from 'react';

export default function AssetsList() {
    const [ maxPage, setMaxPage ] = useState<number | null>(null);
    const handleChangeMaxPage = function(amount: number | null) {
        setMaxPage(amount);
    }

    return <main className={style.main}>
        {/* 카테고리 이런거 */}
        <SideSection />

        {/* 리스트 */}
        <article className={style.content}>
            <AssetsListContainer onChangeMaxPage={handleChangeMaxPage} />
            <AssetsListPaginationQuery max={maxPage} />
        </article>
    </main>
}
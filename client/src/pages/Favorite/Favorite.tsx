import AssetsListContainer from "@components/AssetsList/List";
import SideSection from "@components/AssetsList/SideSection";
import FavoriteHead from "@components/Favorite/Head";
import FavoriteSelectList from "@components/Favorite/List";
import FavoriteSelectHead from "@components/Favorite/SelectHead";
import originStyle from '@styles/assetsList/style.module.scss';

export default function Favorite() {
    return <main className={originStyle.main}>
        {/* 카테고리 이런거 */}
        <SideSection />

        {/* 리스트 */}
        <article className={originStyle.content}>
            <FavoriteHead />
            <FavoriteSelectHead />

            {/* 선택 할때 */}
            <FavoriteSelectList />

            {/* 선택 안할때 */}
            <AssetsListContainer />
        </article>
    </main>;
}
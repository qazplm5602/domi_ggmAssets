import AssetsListContainer from '@components/AssetsList/List';
import Pagination from '@components/Pagination/Pagination';
import style from '@styles/assetsList/style.module.scss';

export default function AssetsList() {
    return <main className={style.main}>
        <AssetsListContainer />
        <Pagination />
    </main>
}
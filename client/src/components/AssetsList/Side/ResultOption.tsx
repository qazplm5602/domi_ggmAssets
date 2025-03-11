import AssetsListSideBox from "../SideBox";
import AssetsListSideSelect from "./Select";
// import style from '@styles/assetsList/side.module.scss';

export default function AssetsListSideResultOption() {
    return <AssetsListSideBox title="검색 설정">
        <AssetsListSideSelect title="정렬" />
        <AssetsListSideSelect title="표시 갯수" />
    </AssetsListSideBox>
}
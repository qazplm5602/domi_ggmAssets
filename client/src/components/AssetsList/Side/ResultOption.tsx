import AssetsListSideBox from "../SideBox";
import AssetsListSideSelect from "./Select";
// import style from '@styles/assetsList/side.module.scss';

export default function AssetsListSideResultOption() {
    return <AssetsListSideBox title="검색 설정">
        <AssetsListSideSelect
            title="정렬"
            index="order"
            items={[
                { text: "제목순", value: "0" },
                { text: "등록순", value: "1" },
            ]}
        />
        <AssetsListSideSelect
            title="표시 갯수"
            index="amount"
            items={[
                { text: "16", value: "16" },
                { text: "32", value: "32" },
                { text: "64", value: "64" },
            ]}
        />
    </AssetsListSideBox>
}
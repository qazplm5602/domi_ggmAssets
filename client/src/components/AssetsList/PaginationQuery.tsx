import Pagination from "@components/Pagination/Pagination";
import { useAssetSearchOption, useSetAssetSearchOption } from "./hook";
import PrePagination from "@components/Pagination/PrePagination";

type Props = {
    max: number | null // null 이면 로딩
}

export default function AssetsListPaginationQuery({ max }: Props) {
    const { page } = useAssetSearchOption();
    const setAssetParams = useSetAssetSearchOption();

    const handleChangePage = function(page: number) {
        setAssetParams({ page: (page - 1).toString() });
    }

    if (max === null)
        return <PrePagination current={Number(page) + 1} />;
    
    return <Pagination current={Number(page) + 1} maxPage={max} onChangePage={handleChangePage} />
}
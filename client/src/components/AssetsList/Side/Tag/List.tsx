import { useFavoriteTagList } from "@components/Favorite/Tag/Context";
import AssetsListSideTagItem from "./Item";

export default function AssetsListSideTagList() {
    const [ tags ] = useFavoriteTagList();

    return <>
        <AssetsListSideTagItem />
        <AssetsListSideTagItem />
        <AssetsListSideTagItem />
        <AssetsListSideTagItem />
        <AssetsListSideTagItem />
    </>;
}
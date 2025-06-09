import { useFavoriteTagList } from "@components/Favorite/Tag/Context";
import AssetsListSideTagItem from "./Item";

export default function AssetsListSideTagList() {
    const [ tags ] = useFavoriteTagList();

    if (!tags)
        return null; // 로딩즁...

    return <>
        {tags.map(v => <AssetsListSideTagItem key={v.id} data={v} />)}
    </>;
}
import SkeletonLoadBox from "@components/SkeletonLoader/SkeletonLoader";
import { ThumbnailVO } from "@domiTypes/asset"
import { getThumbnailURL } from "@utils/file"

type Props = {
    thumbnail: ThumbnailVO | undefined
}

export default function AssetsListItemThumbnailView({ thumbnail }: Props) {
    return thumbnail ? <img src={getThumbnailURL(thumbnail.previewUrl)} alt="thumbnail" /> : <SkeletonLoadBox />;
}
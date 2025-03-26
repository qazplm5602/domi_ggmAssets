import style from '@styles/assetsList/style.module.scss';
import AssetsListItemThumbnail from './Thumbnail';
import { Link } from 'react-router-dom';
import AssetItemDetail from './Detail';
import AssetItemInfo from './Info';
import { AssetPreviewVO } from '@domiTypes/asset';

type Props = {
    className?: string
    data?: AssetPreviewVO
}

const TEST_MOCK_ITEM: AssetPreviewVO =  {
    "id": 1,
    "category": null,
    "title": "도미 에셋 ㅁㄴㅇㄹ",
    "publisher": "도미임",
    "platform": "Unity",
    "thumbnail": {
        "images": [
            {
                "type": "Image",
                "contentUrl": "domi_content.jpg",
                "previewUrl": "domi_preview.jpg"
            },
            {
                "type": "Image",
                "contentUrl": "domi_content.jpg",
                "previewUrl": "domi_preview.jpg"
            },
            {
                "type": "Image",
                "contentUrl": "domi_content.jpg",
                "previewUrl": "domi_preview.jpg"
            },
            {
                "type": "Image",
                "contentUrl": "domi_content.jpg",
                "previewUrl": "domi_preview.jpg"
            }
        ],
        "size": 12
    }
}

export default function AssetItem({ className, data = TEST_MOCK_ITEM }: Props) {
    return <Link to={`/asset/${data.id}`}>
        <div className={`${style.item} ${className || ''}`}>
            <AssetsListItemThumbnail id={data.id} images={data.thumbnail} />
            <AssetItemDetail title={data.title} publisher={data.publisher} />
            <AssetItemInfo category={data.category} platform={data.platform} />
        </div>
    </Link>;
}
import { AssetSearchVO } from '@domiTypes/asset';
import style from '@styles/searchBox/style.module.scss';
import { getThumbnailURL } from '@utils/file';
import { Link } from 'react-router-dom';

import emptyIcon from '@assets/empty-icon.webp';

type Props = {
    data: AssetSearchVO
}

export default function SearchPreviewBox({ data }: Props) {
    return <Link to={`/asset/${data.id}`}>
        <div className={style.item}>
            <img src={data.thumbnail ? getThumbnailURL(data.thumbnail) : emptyIcon} alt="thumbnail" className={style.thumbnail} />
            <div className={style.detail}>
                <h3>{data.title}</h3>
                <p>{data.category ? data.category.join(" / ") : "분류되지 않음"}</p>
            </div>
        </div>
    </Link>;
}
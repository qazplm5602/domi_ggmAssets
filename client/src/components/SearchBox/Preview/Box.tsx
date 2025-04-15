import { AssetSearchVO } from '@domiTypes/asset';
import style from '@styles/searchBox/style.module.scss';
import { Link } from 'react-router-dom';

type Props = {
    data: AssetSearchVO
}

export default function SearchPreviewBox({ data }: Props) {
    return <Link to={`/asset/${data.id}`}>
        <div className={style.item}>
            <img src="https://assetstorev1-prd-cdn.unity3d.com/key-image/080f519a-6d10-4d3e-b83f-31dd8b9e9319.jpg" alt="thumbnail" className={style.thumbnail} />
            <div className={style.detail}>
                <h3>{data.title}</h3>
                <p>{data.category ? data.category.join(" / ") : "분류되지 않음"}</p>
            </div>
        </div>
    </Link>;
}
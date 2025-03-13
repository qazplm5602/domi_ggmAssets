import style from '@styles/searchBox/style.module.scss';
import { Link } from 'react-router-dom';

export default function SearchPreviewBox() {
    return <Link to="/asset/1">
        <div className={style.item}>
            <img src="https://assetstorev1-prd-cdn.unity3d.com/key-image/080f519a-6d10-4d3e-b83f-31dd8b9e9319.jpg" alt="thumbnail" className={style.thumbnail} />
            <div className={style.detail}>
                <h3>Coast & Dunes Environment - Dynamic Nature</h3>
                <p>3D / 모델</p>
            </div>
        </div>
    </Link>;
}
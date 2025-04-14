import style from '@styles/assetDetail/style.module.scss';
import { Link } from 'react-router-dom';

type Props = {
    title: string,
    href: string
    text: string
}

export default function AssetDetailInfoLink({ title, text, href }: Props) {
    return <div className={style.box}>
        <h3>{title}</h3>
        <Link to={href}>{text}</Link>
    </div>;
}
import style from '@styles/home/style.module.scss';
import { Link } from 'react-router-dom';

type Props = {
    title: string,
    id: number
}

export default function HomeAssetsBoxHead({ id, title }: Props) {
    return <article className={style.box_head}>
        <h2>{title}</h2>
        <Link to={`/assets?category=${id}`} className={style.goto}>전체 보기</Link>
    </article>;
}
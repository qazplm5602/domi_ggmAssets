import style from '@styles/favorite/style.module.scss';
import lineIcon from '@assets/icons/horizontal-line.svg';

type Props = {
    color: string,
    name: string,
    check: 'all' | 'empty' | 'half',
    onClick?: () => void
}

export default function FavoriteSelectHeadTagItem({ color, name, check, onClick }: Props) {
    const checkStyle: React.CSSProperties = {
        backgroundColor: (check !== "empty") ? `#${color}` : 'transparent',
        borderColor: (check === "empty") ? `#${color}` : 'transparent',
    }
    
    return <button className={style.tag} onClick={onClick}>
        <div className={style.status} style={checkStyle}>
            {check === "half" && <img src={lineIcon} alt="status line" draggable={false} />}
        </div>
        <p>{name}</p>
    </button>;
}
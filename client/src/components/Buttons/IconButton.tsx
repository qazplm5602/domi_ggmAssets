import style from '@styles/buttons/style.module.scss';

type Props = {
    className?: string,
    icon: string,
    size?: number,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function IconButton({ className, icon, size, onClick }: Props) {
    return <button className={`${style.onlyIco} ${className ? className : ''}`} onClick={onClick}>
        <img src={icon} alt="button icon" style={{ width: size, height: size }} />
    </button>
}